import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuoteForm from '../components/QuoteForm';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const CheckoutPage = () => {
  const { items, clearCart, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [items.length, navigate]);

  const handleQuoteSuccess = () => {
    clearCart();
    navigate('/contact', { replace: true });
  };

  if (items.length === 0) {
    return null;
  }

  const quoteItems = items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity }));

  return (
    <div className="min-h-screen pt-24 pb-24" data-testid="checkout-page">
      <SEO title="Checkout" path="/cart/checkout" noindex />
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <Link
              to="/cart"
              className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4"
              data-testid="checkout-back-to-cart"
            >
              ← Back to cart
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Request a quote
            </h1>
            <p className="font-body text-muted-foreground">
              We'll prepare a custom quote for your {count} item{count !== 1 ? 's' : ''}.
            </p>
          </div>

          <div className="mb-8 p-4 rounded-xl bg-muted border border-border">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Items in your request
            </h2>
            <ul className="space-y-1 font-body text-sm text-muted-foreground" data-testid="checkout-items-summary">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <QuoteForm
              initialItems={quoteItems}
              onSuccess={handleQuoteSuccess}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
