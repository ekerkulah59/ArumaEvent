import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../lib/utils';
import { Badge } from '../components/ui/badge';

const RentalCard = ({ rental, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-testid={`rental-card-${rental.id}`}
    >
      <Link to={`/rentals/${rental.id}`}>
        <div className="card-hover bg-white rounded-xl overflow-hidden border border-border/50">
          {/* Image */}
          <div className="image-zoom aspect-square relative bg-muted">
            {rental.images?.length > 0 ? (
              <img
                src={rental.images[0]}
                alt={rental.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-body">
                No image
              </div>
            )}
            {/* {rental.quantity_available < 10 && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                {rental.quantity_available} left
              </Badge>
            )} */}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {rental.name}
            </h3>
            <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-1">
              {rental.shortDescription ?? rental.short_description}
            </p>
            <div className="flex items-center justify-between">
              <div>
                {/* <span className="font-body text-lg font-semibold text-foreground">
                  {formatPrice(rental.price_per_day)}
                </span>
                <span className="font-body text-xs text-muted-foreground">/day</span> */}
              </div>
              {/* {rental.is_available ? (
                <span className="font-body text-xs text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="font-body text-xs text-red-500 font-medium">Out of Stock</span>
              )} */}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RentalCard;
