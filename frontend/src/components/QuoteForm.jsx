import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import quoteService from '../services/quoteService';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_date: z.string().optional(),
  guest_count: z.string().optional(),
  event_location: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

/**
 * @param {Object} props
 * @param {string} [props.serviceId] - Prefill for single-service quote
 * @param {string} [props.rentalId] - Prefill for single-rental quote
 * @param {string} [props.prefillEventType] - Prefill event type
 * @param {Array<{ id: string, name: string, quantity: number }>} [props.initialItems] - Cart items for multi-item quote (id, name, quantity)
 * @param {() => void} [props.onSuccess] - Called after successful submit (e.g. clear cart, redirect)
 */
const QuoteForm = ({
  serviceId = null,
  rentalId = null,
  prefillEventType = '',
  initialItems = null,
  onSuccess = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      event_type: prefillEventType,
      event_date: '',
      guest_count: '',
      event_location: '',
      message: '',
    },
  });

  const eventType = watch('event_type');

  const buildItems = () => {
    if (initialItems && initialItems.length > 0) {
      return initialItems.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: Number(i.quantity) || 1,
      }));
    }
    if (rentalId) return [{ id: rentalId, name: 'Rental item', quantity: 1 }];
    if (serviceId) return [{ id: serviceId, name: 'Service item', quantity: 1 }];
    return undefined;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        eventType: data.event_type,
        eventDate: data.event_date || undefined,
        guestCount: data.guest_count && String(data.guest_count).trim() !== ''
          ? Number(data.guest_count)
          : undefined,
        message: data.message.trim(),
        eventLocation: data.event_location?.trim() || undefined,
        items: buildItems(),
        serviceId: serviceId ?? undefined,
        rentalId: rentalId ?? undefined,
      };
      const result = await quoteService.submitQuoteRequest(payload);
      toast.success(result.message || 'Quote request received!', {
        description: "We'll get back to you within 24-48 hours.",
      });
      reset();
      if (typeof onSuccess === 'function') onSuccess();
    } catch (error) {
      toast.error('Something went wrong', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'baby_shower', label: 'Baby Shower' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="quote-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="font-body text-sm">Full Name *</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            placeholder="Your full name"
            className="input-focus"
            data-testid="quote-form-name"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-body text-sm">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            placeholder="your@email.com"
            className="input-focus"
            data-testid="quote-form-email"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-body text-sm">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            placeholder="(123) 456-7890"
            className="input-focus"
            data-testid="quote-form-phone"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <Label htmlFor="event_type" className="font-body text-sm">Event Type *</Label>
          <Select 
            value={eventType} 
            onValueChange={(value) => setValue('event_type', value)}
          >
            <SelectTrigger id="event_type" data-testid="quote-form-event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.event_type && (
            <p className="text-xs text-red-500">{errors.event_type.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Event Date */}
        <div className="space-y-2">
          <Label htmlFor="event_date" className="font-body text-sm">Event Date <span className="text-muted-foreground">(optional)</span></Label>
          <Input
            id="event_date"
            type="date"
            {...register('event_date')}
            className="input-focus"
            data-testid="quote-form-date"
          />
        </div>

        {/* Guest Count */}
        <div className="space-y-2">
          <Label htmlFor="guest_count" className="font-body text-sm">Expected Guests <span className="text-muted-foreground">(optional)</span></Label>
          <Input
            id="guest_count"
            type="number"
            {...register('guest_count')}
            placeholder="Approximate number"
            className="input-focus"
            data-testid="quote-form-guests"
          />
        </div>
      </div>

      {/* Event Location */}
      <div className="space-y-2">
        <Label htmlFor="event_location" className="font-body text-sm">
          Event location / Venue <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="event_location"
          type="text"
          {...register('event_location')}
          placeholder="e.g. City, venue name, or address"
          className="input-focus"
          data-testid="quote-form-event-location"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-body text-sm">Tell us about your event *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Share details about your vision, specific needs, or any questions..."
          rows={5}
          className="input-focus resize-none"
          data-testid="quote-form-message"
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
        data-testid="quote-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Request Quote
          </>
        )}
      </Button>
    </form>
  );
};

export default QuoteForm;
