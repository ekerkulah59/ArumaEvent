import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, Check, Calendar, MessageCircle, ShoppingBag } from 'lucide-react';
import { formatPrice, serviceCategoryLabels } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import QuoteForm from '../components/QuoteForm';
import { services } from '../data/staticData';
import { useCart } from '../context/CartContext';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div
        className="min-h-screen pt-24 flex flex-col items-center justify-center"
        data-testid="service-not-found"
        role="alert"
      >
        <h1 className="font-heading text-2xl mb-4">Service not found</h1>
        <Link to="/services" data-testid="back-to-services">
          <Button className="rounded-full">Back to Services</Button>
        </Link>
      </div>
    );
  }

  const categoryLabel = serviceCategoryLabels[service.category] || service.category;
  const priceDisplay = service.starting_price ? formatPrice(service.starting_price) : 'Custom Quote';

  return (
    <div className="min-h-screen pt-24" data-testid="service-detail-page">
      <div className="container-custom py-4">
        <Link
          to="/services"
          className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          data-testid="back-to-services"
        >
          <ArrowLeft size={16} />
          Back to Services
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
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={service.images[activeImage]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  data-testid="service-main-image"
                />
              </div>
              {service.images.length > 1 && (
                <div className="flex gap-3">
                  {service.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === index
                          ? 'border-primary'
                          : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      data-testid={`service-thumbnail-${index}`}
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
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="service-title">
                  {service.name}
                </h1>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* <div className="p-6 bg-muted rounded-xl">
                <p className="font-body text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="font-heading text-3xl font-bold text-foreground" data-testid="service-price">
                  {priceDisplay}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">{service.price_note}</p>
              </div> */}

              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  What's Included
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span className="font-body text-sm">
                  {service.is_available
                    ? <span className="text-green-600">Currently accepting bookings</span>
                    : <span className="text-red-500">Fully booked - Contact for waitlist</span>
                  }
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full py-6 border-primary text-primary hover:bg-primary/10"
                  onClick={() => {
                    addItem({
                      type: 'service',
                      id: service.id,
                      name: service.name,
                      quantity: 1,
                      image: service.images?.[0],
                    });
                    toast.success('Added to cart', {
                      description: `${service.name} added. Request a quote when ready.`,
                    });
                  }}
                  data-testid="service-detail-add-to-cart"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
                <Link to="/contact" className="flex-1">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
                    data-testid="request-quote-btn"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted" data-testid="quote-form-section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Request a Quote
              </h2>
              <p className="font-body text-muted-foreground">
                Tell us about your event and we'll create a custom package for you.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <QuoteForm
                serviceId={service.id}
                prefillEventType={service.category}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
