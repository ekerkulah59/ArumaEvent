import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Rentals', path: '/rentals' },
    { name: 'Gallery', path: '/gallery' },
    // { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      data-testid="navbar"
    >
      <nav 
        className={`mx-auto max-w-6xl px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg' 
            : 'bg-white/60 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-heading text-xl md:text-2xl font-semibold text-foreground"
            data-testid="navbar-logo"
          >
            Aruma Events
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-medium transition-colors link-underline ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'
                }`}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label={`Cart with ${count} items`}
              data-testid="nav-cart-link"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium"
                  data-testid="nav-cart-count"
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
            <Link to="/contact">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                data-testid="nav-get-quote-btn"
              >
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 pt-4 border-t border-border"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-body text-base font-medium py-2 ${
                      isActive(link.path) 
                        ? 'text-primary' 
                        : 'text-foreground/80'
                    }`}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/cart" className="flex items-center justify-center gap-2 py-2 font-body text-sm font-medium text-foreground/80 hover:text-foreground" data-testid="mobile-nav-cart">
                  <ShoppingBag className="h-4 w-4" />
                  Cart {count > 0 ? `(${count})` : ''}
                </Link>
                <Link to="/contact" className="mt-2">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    data-testid="mobile-get-quote-btn"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
