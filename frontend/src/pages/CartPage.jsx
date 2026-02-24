import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import SEO from '../components/SEO';

const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-24" data-testid="cart-page">
        <SEO title="Cart" path="/cart" noindex />
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Your cart is empty
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              Add rentals or services from our catalog to request a quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/rentals">
                <Button className="rounded-full" data-testid="cart-browse-rentals">
                  Browse Rentals
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="rounded-full" data-testid="cart-browse-services">
                  Browse Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24" data-testid="cart-page">
      <SEO title="Cart" path="/cart" noindex />
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Cart
          </h1>
          <p className="font-body text-muted-foreground">
            Review your items and proceed to request a quote.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          <ul className="space-y-4" data-testid="cart-items-list">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.li
                  key={`${item.type}-${item.id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-border shadow-sm"
                  data-testid={`cart-item-${item.type}-${item.id}`}
                >
                  <Link
                    to={item.type === 'rental' ? `/rentals/${item.id}` : `/services/${item.id}`}
                    className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge
                          variant="secondary"
                          className="mb-1 rounded-full text-xs"
                          data-testid={`cart-item-type-${item.type}-${item.id}`}
                        >
                          {item.type === 'rental' ? 'Rental' : 'Service'}
                        </Badge>
                        <Link
                          to={item.type === 'rental' ? `/rentals/${item.id}` : `/services/${item.id}`}
                          className="font-heading font-semibold text-foreground hover:text-primary transition-colors block"
                          data-testid={`cart-item-name-${item.type}-${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.type, item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        data-testid={`cart-item-remove-${item.type}-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-body text-sm text-muted-foreground">Qty</span>
                      <div className="flex items-center rounded-full border border-border overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-muted"
                          onClick={() =>
                            updateQuantity(item.type, item.id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          data-testid={`cart-item-decrease-${item.type}-${item.id}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span
                          className="w-8 text-center font-body text-sm tabular-nums"
                          data-testid={`cart-item-qty-${item.type}-${item.id}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-muted"
                          onClick={() => updateQuantity(item.type, item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          data-testid={`cart-item-increase-${item.type}-${item.id}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link to="/cart/checkout" className="flex-1">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
                data-testid="cart-proceed-to-checkout"
              >
                Request quote for {items.reduce((s, i) => s + i.quantity, 0)} item
                {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </Button>
            </Link>
            <Link to="/rentals">
              <Button variant="outline" className="w-full sm:w-auto rounded-full" data-testid="cart-continue-shopping">
                Continue shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
