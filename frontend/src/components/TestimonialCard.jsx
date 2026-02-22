import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="testimonial-card relative"
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
      
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-200'}
          />
        ))}
      </div>

      {/* Review */}
      <p className="font-body text-foreground/80 text-sm leading-relaxed mb-6">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.client_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-heading text-lg text-primary font-semibold">
              {testimonial.client_name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-body font-semibold text-foreground text-sm">
            {testimonial.client_name}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            {testimonial.event_type}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
