from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")


# Models
class ContactSubmission(BaseModel):
    """Contact form (general inquiry)."""
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: Optional[str] = None
    guest_count: Optional[int] = None
    event_location: Optional[str] = Field(None, alias="eventLocation")
    message: str
    service_id: Optional[str] = None
    rental_id: Optional[str] = None
    items: Optional[list] = None


# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Event Décor Hub API"}


def _send_quote_emails_task(
    name: str,
    email: str,
    phone: str,
    event_type: str,
    message: str,
    event_date: Optional[str] = None,
    guest_count: Optional[int] = None,
    event_location: Optional[str] = None,
    items: Optional[list] = None,
) -> None:
    """Background task to send quote notification + confirmation email."""
    try:
        from email_service import send_quote_notification, send_quote_confirmation_to_customer
        send_quote_notification(
            name=name,
            email=email,
            phone=phone,
            event_type=event_type,
            message=message,
            event_date=event_date,
            guest_count=guest_count,
            event_location=event_location,
            items=items,
        )
        send_quote_confirmation_to_customer(
            customer_email=email,
            customer_name=name,
            event_type=event_type,
            event_date=event_date,
            items=items,
        )
    except Exception as e:
        logger.exception("Quote email failed: %s", e)


def _send_contact_email_task(name: str, email: str, phone: str, subject: str, message: str) -> None:
    """Background task to send contact form notification."""
    try:
        from email_service import send_contact_notification
        send_contact_notification(name=name, email=email, phone=phone, subject=subject, message=message)
    except Exception as e:
        logger.exception("Contact email failed: %s", e)


# Contact form endpoint
@api_router.post("/contact")
async def submit_contact(input: ContactSubmission, background_tasks: BackgroundTasks):
    background_tasks.add_task(
        _send_contact_email_task,
        input.name,
        input.email,
        input.phone or "",
        input.subject,
        input.message,
    )
    return {
        "success": True,
        "message": "Thank you for contacting us! We will get back to you within 24 hours.",
    }


# Quote request endpoint
@api_router.post("/quotes")
async def submit_quote_request(input: QuoteRequestCreate, background_tasks: BackgroundTasks):
    data = input.model_dump(by_alias=True)
    items = data.pop("items", None)

    background_tasks.add_task(
        _send_quote_emails_task,
        input.name,
        input.email,
        input.phone,
        input.event_type,
        input.message,
        input.event_date,
        input.guest_count,
        input.event_location,
        items,
    )

    return {
        "success": True,
        "message": "Quote request submitted successfully. We'll get back to you within 24-48 hours.",
        "data": data,
    }


# Include router
app.include_router(api_router)

# CORS
_cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in _cors_origins if o.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_check():
    if not os.environ.get("RESEND_API_KEY"):
        logger.warning(
            "RESEND_API_KEY not set — quote/contact emails will NOT be sent. "
            "Add RESEND_API_KEY to .env for email delivery."
        )
    else:
        recipient = os.environ.get("QUOTE_RECIPIENT_EMAIL", "arumaeventsservices@gmail.com")
        logger.info("Quote/contact emails enabled → %s", recipient)
