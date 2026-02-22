import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlideshow = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Preload all images so there's no delay when switching slides
    useEffect(() => {
        if (!images?.length) return;
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [images]);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    if (!images || images.length === 0) {
        return null;
    }

    const slideDurationSec = interval / 1000;

    return (
        <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Hero slide ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1.12 }}
                    transition={{
                        opacity: { duration: 0.5, ease: "easeOut" },
                        scale: { duration: slideDurationSec, ease: "linear" },
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.88,
                        transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

            {/* Slideshow Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-8 right-8 flex gap-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            data-testid={`hero-slide-${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSlideshow;
