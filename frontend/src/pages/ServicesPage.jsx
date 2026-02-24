import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { serviceCategoryLabels } from '../lib/utils';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { services } from '../data/staticData';

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const filteredServices = useMemo(() => {
    return activeCategory
      ? services.filter((s) => s.category === activeCategory)
      : services;
  }, [activeCategory]);

  const categories = [
    { value: '', label: 'All Services' },
    ...Object.entries(serviceCategoryLabels).map(([value, label]) => ({ value, label })),
  ];

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen pt-24" data-testid="services-page">
      <SEO
        title="Event Décor Services"
        description="Wedding décor, corporate events, birthdays, baby showers, and more. Custom event design and full-service décor from Aruma Events."
        path="/services"
      />
      {/* Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Our Services
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Aruma Events Decor Services
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              At Aruma Events, we bring your vision to life—from intimate gatherings to 
              grand celebrations—with stunning décor tailored to your unique style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2" data-testid="service-category-filters">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={activeCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${
                    activeCategory === cat.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                  onClick={() => handleCategoryChange(cat.value)}
                  data-testid={`filter-${cat.value || 'all'}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground">No services found in this category.</p>
              <Button 
                variant="link" 
                onClick={() => handleCategoryChange('')}
                className="mt-2 text-primary"
              >
                View all services
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Don't see what you're looking for?
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            We offer custom décor packages tailored to your unique needs.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              data-testid="services-contact-btn"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
