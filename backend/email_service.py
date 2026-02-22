"""
Email service for sending quote notifications via Resend.
When RESEND_API_KEY is not set, emails are skipped (useful for local dev).
"""

import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# Business email to receive quote notifications
QUOTE_RECIPIENT_EMAIL = os.environ.get("QUOTE_RECIPIENT_EMAIL", "arumaeventsservices@gmail.com")
# Sender - use Resend's test domain if not configured
EMAIL_FROM = os.environ.get("EMAIL_FROM", "Aruma Events <onboarding@resend.dev>")


def _get_resend_client():
    """Lazy import to avoid failing if resend not installed."""
    try:
        import resend
        return resend
    except ImportError:
        return None


def _format_event_type(raw: str) -> str:
    """Convert snake_case to Title Case (e.g., baby_shower → Baby Shower)."""
    return raw.replace("_", " ").strip().title()


def _value_cell(value: str, is_unspecified: bool = False) -> str:
    """Return HTML for a value, styled if unspecified."""
    if is_unspecified:
        return f'<span style="color: #94a3b8; font-style: italic;">{value}</span>'
    return value


def build_quote_email_html(
    name: str,
    email: str,
    phone: str,
    event_type: str,
    message: str,
    event_date: Optional[str] = None,
    guest_count: Optional[int] = None,
    event_location: Optional[str] = None,
    items: Optional[list] = None,
) -> str:
    """Build HTML body for quote notification email."""
    event_type_display = _format_event_type(event_type)
    event_date_str = event_date or "Not specified"
    guest_str = str(guest_count) if guest_count else "Not specified"
    location_str = event_location or "Not specified"
    date_unspecified = not event_date
    guest_unspecified = not guest_count
    location_unspecified = not event_location

    items_html = ""
    if items and len(items) > 0:
        items_html = "".join(
            f'''
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #E2E2DF; font-size: 15px; color: #1A1A1A;">
                • {item.get('name', 'Item')} <span style="color: #64748B;">(Qty: {item.get('quantity', 1)})</span>
              </td>
            </tr>'''
            for item in items
        )
    else:
        items_html = '''
            <tr>
              <td style="padding: 12px 0; color: #94a3b8; font-style: italic; font-size: 15px;">
                No specific items requested
              </td>
            </tr>'''

    message_text = message or "No additional message"
    message_display = message_text.replace("\n", "<br>")

    return f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request — Aruma Events</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F0F0EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #8DA399; padding: 28px 32px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.02em;">
                      New Quote Request
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">Aruma Events</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <!-- Customer Information -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Customer Information</p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: #1A1A1A;"><strong>Name:</strong> {name}</p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: #1A1A1A;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #8DA399; text-decoration: none; font-weight: 500;">{email}</a></p>
                    <p style="margin: 0; font-size: 15px; color: #1A1A1A;"><strong>Phone:</strong> <a href="tel:{phone}" style="color: #8DA399; text-decoration: none; font-weight: 500;">{phone}</a></p>
                  </td>
                </tr>
              </table>

              <!-- Event Details -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Event Details</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 15px; color: #1A1A1A;"><strong>Event Type:</strong></td>
                        <td style="padding: 6px 0; font-size: 15px; color: #1A1A1A;">{event_type_display}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 15px; color: #1A1A1A;"><strong>Event Date:</strong></td>
                        <td style="padding: 6px 0; font-size: 15px;">{_value_cell(event_date_str, date_unspecified)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 15px; color: #1A1A1A;"><strong>Location:</strong></td>
                        <td style="padding: 6px 0; font-size: 15px;">{_value_cell(location_str, location_unspecified)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 15px; color: #1A1A1A;"><strong>Guest Count:</strong></td>
                        <td style="padding: 6px 0; font-size: 15px;">{_value_cell(guest_str, guest_unspecified)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Requested Items -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Requested Items</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      {items_html}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFBF7; border-left: 4px solid #D4AF37; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
                    <p style="margin: 0; font-size: 15px; color: #1A1A1A; line-height: 1.6;">{message_display}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #FAFAF9; border-top: 1px solid #E2E2DF;">
              <p style="margin: 0; font-size: 13px; color: #64748B; line-height: 1.5;">
                Reply directly to this email to respond to the customer.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8;">
                Quote submitted via Aruma Events website
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
""".strip()


def build_quote_email_plain(
    name: str,
    email: str,
    phone: str,
    event_type: str,
    message: str,
    event_date: Optional[str] = None,
    guest_count: Optional[int] = None,
    event_location: Optional[str] = None,
    items: Optional[list] = None,
) -> str:
    """Build plain text body for quote notification email."""
    event_type_display = _format_event_type(event_type)
    event_date_str = event_date or "Not specified"
    guest_str = str(guest_count) if guest_count else "Not specified"
    location_str = event_location or "Not specified"

    lines = [
        "New Quote Request — Aruma Events",
        "",
        "Customer Information:",
        f"- Name: {name}",
        f"- Email: {email}",
        f"- Phone: {phone}",
        "",
        "Event Details:",
        f"- Event Type: {event_type_display}",
        f"- Event Date: {event_date_str}",
        f"- Location: {location_str}",
        f"- Guest Count: {guest_str}",
        "",
        "Requested Items:",
    ]
    if items and len(items) > 0:
        for item in items:
            lines.append(f"- {item.get('name', 'Item')} (Quantity: {item.get('quantity', 1)})")
    else:
        lines.append("- No specific items requested")
    lines.extend(["", "Message:", message or "No additional message"])
    return "\n".join(lines)


def _send_email(to: str, subject: str, html: str, text: str, reply_to: Optional[str] = None) -> bool:
    """Generic email send via Resend. Returns True on success."""
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        return False

    resend = _get_resend_client()
    if not resend:
        return False

    try:
        resend.api_key = api_key
        params = {
            "from": EMAIL_FROM,
            "to": [to],
            "subject": subject,
            "html": html,
            "text": text,
        }
        if reply_to:
            params["reply_to"] = reply_to
        resend.Emails.send(params)
        return True
    except Exception as e:
        logger.exception("Failed to send email: %s", e)
        return False


def build_customer_confirmation_html(
    name: str,
    event_type: str,
    event_date: Optional[str] = None,
    items: Optional[list] = None,
) -> str:
    """Build HTML for customer confirmation email."""
    event_date_str = event_date or "Not specified"
    items_html = ""
    if items and len(items) > 0:
        items_html = "<ul>" + "".join(
            f"<li>{item.get('name', 'Item')} (Qty: {item.get('quantity', 1)})</li>"
            for item in items
        ) + "</ul>"
    else:
        items_html = "<p><em>No specific items requested</em></p>"

    return f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }}
    h1 {{ color: #1a1a2e; font-size: 1.5rem; }}
    .highlight {{ background: #f0f4ff; padding: 1rem; border-radius: 8px; margin: 1rem 0; }}
    .footer {{ margin-top: 2rem; font-size: 0.875rem; color: #666; }}
  </style>
</head>
<body>
  <h1>We Received Your Quote Request</h1>
  <p>Hi {name},</p>
  <p>Thank you for requesting a quote from Aruma Events. We've received your request and our team will review it and get back to you within 24-48 hours.</p>

  <div class="highlight">
    <p><strong>Your request summary:</strong></p>
    <p>Event Type: {event_type}</p>
    <p>Event Date: {event_date_str}</p>
    <p>Requested Items:</p>
    {items_html}
  </div>

  <p>If you have any questions in the meantime, reply to this email or give us a call at (835) 212-0574.</p>

  <div class="footer">
    — The Aruma Events Team
  </div>
</body>
</html>
""".strip()


def send_contact_notification(
    name: str,
    email: str,
    subject: str,
    message: str,
    phone: Optional[str] = None,
) -> bool:
    """
    Send contact form notification to the business email.
    Returns True if sent successfully.
    """
    if not os.environ.get("RESEND_API_KEY"):
        logger.info("RESEND_API_KEY not set — skipping contact notification email")
        return False

    resend = _get_resend_client()
    if not resend:
        return False

    try:
        resend.api_key = os.environ.get("RESEND_API_KEY")
        phone_str = phone or "Not provided"
        phone_unspecified = not phone
        message_display = message.replace("\n", "<br>")
        html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form — Aruma Events</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F0F0EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;">
          <tr>
            <td style="background-color: #8DA399; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.02em;">New Contact Form</h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">Aruma Events</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Contact Information</p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: #1A1A1A;"><strong>From:</strong> {name}</p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; color: #1A1A1A;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #8DA399; text-decoration: none; font-weight: 500;">{email}</a></p>
                    <p style="margin: 0; font-size: 15px; color: #1A1A1A;"><strong>Phone:</strong> {_value_cell(phone_str, phone_unspecified)}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0F0EB; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Subject</p>
                    <p style="margin: 0; font-size: 15px; color: #1A1A1A;">{subject}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFBF7; border-left: 4px solid #D4AF37; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #8DA399; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
                    <p style="margin: 0; font-size: 15px; color: #1A1A1A; line-height: 1.6;">{message_display}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #FAFAF9; border-top: 1px solid #E2E2DF;">
              <p style="margin: 0; font-size: 13px; color: #64748B;">Reply directly to this email to respond.</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8;">Contact form submitted via Aruma Events website</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
""".strip()
        text = f"New Contact Form — Aruma Events\n\nFrom: {name}\nEmail: {email}\nPhone: {phone_str}\nSubject: {subject}\n\nMessage:\n{message}"
        resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [QUOTE_RECIPIENT_EMAIL],
            "reply_to": email,
            "subject": f"Contact: {subject}",
            "html": html,
            "text": text,
        })
        logger.info("Contact notification email sent successfully")
        return True
    except Exception as e:
        logger.exception("Failed to send contact notification: %s", e)
        return False


def send_quote_notification(
    name: str,
    email: str,
    phone: str,
    event_type: str,
    message: str,
    event_date: Optional[str] = None,
    guest_count: Optional[int] = None,
    event_location: Optional[str] = None,
    items: Optional[list] = None,
) -> bool:
    """
    Send quote request notification to the business email.
    Returns True if sent successfully, False otherwise (e.g. no API key).
    """
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        logger.info("RESEND_API_KEY not set — skipping quote notification email")
        return False

    resend = _get_resend_client()
    if not resend:
        logger.warning("Resend package not installed — skipping quote notification email")
        return False

    try:
        resend.api_key = api_key

        subject = f"Quote Request — {event_type}"
        if event_date:
            subject += f" on {event_date}"
        subject += " | Aruma Events"

        html_body = build_quote_email_html(
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
        text_body = build_quote_email_plain(
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

        params = {
            "from": EMAIL_FROM,
            "to": [QUOTE_RECIPIENT_EMAIL],
            "reply_to": email,  # Business can reply directly to customer
            "subject": subject,
            "html": html_body,
            "text": text_body,
        }

        resend.Emails.send(params)
        logger.info("Quote notification email sent successfully")
        return True
    except Exception as e:
        logger.exception("Failed to send quote notification email: %s", e)
        return False


def send_quote_confirmation_to_customer(
    customer_email: str,
    customer_name: str,
    event_type: str,
    event_date: Optional[str] = None,
    items: Optional[list] = None,
) -> bool:
    """
    Send a confirmation email to the customer that their quote request was received.
    Returns True if sent successfully, False otherwise.
    """
    if not os.environ.get("RESEND_API_KEY"):
        return False

    html = build_customer_confirmation_html(
        name=customer_name,
        event_type=event_type,
        event_date=event_date,
        items=items,
    )
    text = f"""Hi {customer_name},

Thank you for requesting a quote from Aruma Events. We've received your request and our team will review it and get back to you within 24-48 hours.

Your request summary:
- Event Type: {event_type}
- Event Date: {event_date or 'Not specified'}
- Requested Items: {', '.join(f"{i.get('name', 'Item')} (x{i.get('quantity', 1)})" for i in (items or [])) or 'No specific items'}

If you have any questions, call us at (835) 212-0574.

— The Aruma Events Team"""

    return _send_email(
        to=customer_email,
        subject=f"We Received Your Quote Request — {event_type} | Aruma Events",
        html=html,
        text=text,
    )
