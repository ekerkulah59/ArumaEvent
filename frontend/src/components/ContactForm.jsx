import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import contactService from '../services/contactService';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, '').length >= 10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || undefined,
        subject: data.subject.trim(),
        message: data.message.trim(),
      };
      const result = await contactService.submitContactForm(payload);
      toast.success(result.message || 'Message sent!', {
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (error) {
      toast.error('Something went wrong', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="font-body text-sm">
            Full Name *
          </Label>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            placeholder="Your full name"
            className="input-focus"
            data-testid="contact-form-name"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email" className="font-body text-sm">
            Email *
          </Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            placeholder="your@email.com"
            className="input-focus"
            data-testid="contact-form-email"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone" className="font-body text-sm">
          Phone <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          placeholder="(123) 456-7890"
          className="input-focus"
          data-testid="contact-form-phone"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className="font-body text-sm">
          Subject *
        </Label>
        <Input
          id="contact-subject"
          type="text"
          {...register('subject')}
          placeholder="e.g. General inquiry, Booking question"
          className="input-focus"
          data-testid="contact-form-subject"
        />
        {errors.subject && (
          <p className="text-xs text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="font-body text-sm">
          Message *
        </Label>
        <Textarea
          id="contact-message"
          {...register('message')}
          placeholder="How can we help?"
          rows={5}
          className="input-focus resize-none"
          data-testid="contact-form-message"
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
        data-testid="contact-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
