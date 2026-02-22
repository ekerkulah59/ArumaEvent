import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format price
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Format date
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Slugify text
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Category labels
export const serviceCategoryLabels = {
  wedding: 'Wedding Décor',
  corporate: 'Corporate Events',
  birthday: 'Birthday Parties',
  baby_shower: 'Baby Showers',
  anniversary: 'Anniversaries',
  graduation: 'Graduations',
};

export const rentalCategoryLabels = {
  chairs: 'Chairs',
  tables: 'Tables',
  photo_booths: 'Photo Booths',
  catering_equipment: 'Catering Equipment',
  linens: 'Linens',
  lighting: 'Lighting',
};
