import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import QuoteForm from '../components/QuoteForm';
import { getItemById, rentals, inventory } from '../data/staticData';
import RentalCard from '../components/RentalCard';
import { useCart } from '../context/CartContext';

const RentalDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [addQuantity, setAddQuantity] = useState(1);
  const { addItem } = useCart();
  const rental = getItemById(id) ?? rentals.find((r) => r.id === id);

  if (!rental) {
    return (
      <div
        className="min-h-screen pt-24 flex flex-col items-center justify-center"
        data-testid="rental-not-found"
        role="alert"
      >
        <h1 className="font-heading text-2xl mb-4">Item not found</h1>
        <Link to="/rentals" data-testid="back-to-rentals">
          <Button className="rounded-full">Back to Rentals</Button>
        </Link>
      </div>
    );
  }

  const categoryLabel = rental.category;

  return (
    <div className="min-h-screen pt-24" data-testid="rental-detail-page">
      <div className="container-custom py-4">
        <Link
          to="/rentals"
          className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          data-testid="back-to-rentals"
        >
          <ArrowLeft size={16} />
          Back to Rentals
        </Link>
      </div>

      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4 lg:col-span-3 lg:sticky lg:top-32 lg:self-start"
            >
              <div className="aspect-[4/4] max-h-[420px] rounded-xl overflow-hidden bg-white">
                <img
                  src={rental.images[activeImage]}
                  alt={rental.name}
                  className="w-full h-full object-cover"
                  data-testid="rental-main-image"
                />
              </div>
              {rental.images.length > 1 && (
                <div className="flex gap-3">
                  {rental.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === index
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      data-testid={`rental-thumbnail-${index}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 lg:col-span-2"
            >
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">
                  {categoryLabel}
                </Badge>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="rental-title">
                  {rental.name}
                </h1>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {rental.description}
                </p>
              </div>

              {/* <div className="p-6 bg-muted rounded-xl">
                <p className="font-body text-sm text-muted-foreground mb-1">Price per day</p>
                <p className="font-heading text-2xl font-bold text-primary">
                  {formatPrice(rental.price_per_day)}
                </p>
                {rental.price_per_week && (
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {formatPrice(rental.price_per_week)} per week
                  </p>
                )}
              </div> */}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="rental-qty" className="font-body text-sm text-muted-foreground sr-only">
                    Quantity
                  </label>
                  <input
                    id="rental-qty"
                    type="number"
                    min={1}
                    max={999}
                    value={addQuantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setAddQuantity(Number.isNaN(v) || v < 1 ? 1 : Math.min(999, v));
                    }}
                    className="w-16 h-11 rounded-full border border-border px-3 text-center font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="rental-detail-quantity"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full py-6 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                  onClick={() => {
                    const qty = Math.max(1, addQuantity);
                    addItem({
                      type: 'rental',
                      id: rental.id,
                      name: rental.name,
                      quantity: qty,
                      image: rental.images?.[0],
                    });
                    toast.success('Added to cart', {
                      description: `${rental.name} × ${qty} added. Request a quote when ready.`,
                    });
                  }}
                  data-testid="rental-detail-add-to-cart"
                >
                  <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                  Add to cart
                </Button>
                <Button
                  asChild
                  className="flex-1 w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
                  data-testid="reserve-now-btn"
                >
                  <Link to="/contact">
                    <Calendar className="mr-2 h-4 w-4" />
                    Reserve Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding" data-testid="rental-recent-items">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Recent Rental Items
            </h2>
            <p className="font-body text-muted-foreground">
              Explore more items from our rental catalog.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inventory
              .filter((item) => item.id !== rental.id)
              .slice(0, 4)
              .map((item, index) => (
                <RentalCard key={item.id} rental={item} index={index} />
              ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted" data-testid="rental-quote-form-section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Request a Rental Quote
              </h2>
              <p className="font-body text-muted-foreground">
                Tell us about your event and how many units you need.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <QuoteForm rentalId={rental.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalDetailPage;
