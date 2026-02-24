import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Aruma Events';
const DEFAULT_IMAGE = '/hero-image/fabio-guntur-qG2yK_iNspE-unsplash.jpg';

/**
 * Build absolute URL for og:image and canonical.
 * Uses REACT_APP_SITE_URL in production when set; otherwise origin.
 */
function getBaseUrl() {
  if (typeof window === 'undefined') return '';
  const siteUrl = process.env.REACT_APP_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, '');
  return window.location.origin;
}

/**
 * SEO component for per-page meta tags (title, description, Open Graph, Twitter, canonical).
 * Use on every page so each route has the correct title and description for SEO and sharing.
 *
 * @param {string} title - Page title (e.g. "Services | Aruma Events")
 * @param {string} [description] - Meta description (defaults to site description)
 * @param {string} [image] - Absolute or path for og:image / twitter:image
 * @param {string} [path] - Path for canonical (e.g. "/services"). Omit for current path.
 * @param {boolean} [noindex] - If true, sets robots noindex,nofollow
 */
export default function SEO({ title, description, image, path, noindex = false }) {
  const baseUrl = getBaseUrl();
  const canonicalPath = path !== undefined ? path : (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonical = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const imageUrl = image?.startsWith('http') ? image : `${baseUrl}${image?.startsWith('/') ? image : DEFAULT_IMAGE}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const metaDescription =
    description ||
    'Premium event rental and décor for weddings, corporate events, and celebrations. Tents, tables, chairs, photo booths, and custom design.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
