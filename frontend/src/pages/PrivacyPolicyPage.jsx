import SEO from '../components/SEO';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="privacy-policy-page">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Aruma Events — learn how we collect, use, and protect your personal information when you use our event rental and décor services."
        path="/privacy-policy"
        noindex={false}
      />
      <div className="container-custom max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="font-body text-muted-foreground mb-10">Last updated: February 24, 2026</p>

        <div className="prose prose-lg max-w-none font-body text-foreground/80 space-y-8">

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">1. Who We Are</h2>
            <p>
              Aruma Events ("we", "us", or "our") is an event rental and décor company located at 53 Cilento Dr,
              Magnolia, Delaware 19962. We operate the website <strong>aurmarentals.com</strong> and provide event
              rental and décor services throughout Delaware and surrounding areas.
            </p>
            <p className="mt-2">
              If you have questions about this policy, contact us at{' '}
              <a href="mailto:arumaeventsservices@gmail.com" className="text-primary hover:underline">
                arumaeventsservices@gmail.com
              </a>{' '}
              or by phone at (835) 212-0574.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name, email address, and phone number when you submit a contact or quote request form</li>
              <li>Event details (date, type, location) you share when requesting a quote</li>
              <li>Billing and delivery address when you place an order or rental booking</li>
            </ul>
            <p className="mt-4">We also automatically collect certain technical information when you visit our site:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Pages visited, time spent, and referral source (via PostHog analytics)</li>
              <li>Browser type, operating system, and device type</li>
              <li>IP address and approximate geographic location</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your quote requests and booking inquiries</li>
              <li>Process and fulfill rental orders</li>
              <li>Send confirmation and follow-up communications about your event</li>
              <li>Improve our website and services through aggregate analytics</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-4">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">4. Cookies & Analytics</h2>
            <p>
              Our website uses <strong>PostHog</strong>, an analytics platform, to understand how visitors interact
              with our site. PostHog may use cookies and session recording to capture anonymized usage data. No
              personally identifiable information is shared with PostHog beyond what is technically required for
              session tracking.
            </p>
            <p className="mt-2">
              You can opt out of analytics tracking by enabling "Do Not Track" in your browser settings, or by
              contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">5. Data Retention</h2>
            <p>
              We retain contact and booking information for as long as necessary to fulfill your request and for up
              to 3 years afterward for business record-keeping purposes. You may request deletion of your data at any
              time by emailing us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:arumaeventsservices@gmail.com" className="text-primary hover:underline">
                arumaeventsservices@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (e.g., social media platforms). We are not
              responsible for the privacy practices of those sites. We encourage you to review their privacy policies
              before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information
              from children. If you believe a child has provided us personal information, please contact us and we
              will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting
              the updated policy on this page with a new "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <address className="not-italic mt-3 space-y-1 text-foreground/70">
              <p><strong>Aruma Events</strong></p>
              <p>53 Cilento Dr, Magnolia, Delaware 19962</p>
              <p>
                Email:{' '}
                <a href="mailto:arumaeventsservices@gmail.com" className="text-primary hover:underline">
                  arumaeventsservices@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+18352120574" className="text-primary hover:underline">
                  (835) 212-0574
                </a>
              </p>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
