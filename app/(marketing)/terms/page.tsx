import { MarketingLayout } from "@/components/layouts/marketing-layout";

export default function TermsPage() {
  return (
    <MarketingLayout>
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-center text-gray-600">Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to PNGIO. By accessing or using our visual content platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you (either as an individual or on behalf of an organization) and PNGIO. We reserve the right to modify these Terms at any time, and continued use constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PNGIO is a multi-tenant SaaS platform that enables organizations to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Create and manage visual content templates</li>
              <li>Store and organize brand assets (logos, fonts, images)</li>
              <li>Enable team members to create designs using approved templates</li>
              <li>Export designs in various formats (PNG, PDF)</li>
              <li>Collaborate through team inspiration feeds</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We offer Free, Pro, and Enterprise plans with varying features and limits as described on our pricing page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. Account Registration and Security</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use PNGIO, you must create an account with accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Organization Ownership</h3>
            <p className="text-gray-700 leading-relaxed">
              The person who creates an organization account is the "Owner" and has full administrative rights, including the ability to manage users, billing, and delete the organization. Owners may transfer ownership to another user within the organization.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. User Roles and Permissions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PNGIO supports three user roles:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Owner:</strong> Full access to all features, billing, and organization settings</li>
              <li><strong>Admin:</strong> Can manage templates, brand assets, and invite users</li>
              <li><strong>Staff:</strong> Can use templates to create and export designs</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for properly configuring user roles and permissions within your organization.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Acceptable Use Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree NOT to use PNGIO to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the platform for any illegal, fraudulent, or deceptive purpose</li>
              <li>Scrape, copy, or reverse engineer our platform</li>
              <li>Resell or redistribute our services without permission</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Violation of this policy may result in immediate account suspension or termination.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Intellectual Property Rights</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">6.1 Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain all rights to content you create or upload to PNGIO (templates, designs, brand assets). By using our service, you grant us a limited license to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Store, process, and display your content as necessary to provide the service</li>
              <li>Create backups and ensure data redundancy</li>
              <li>Use anonymized, aggregated data for analytics and improvements</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">6.2 Our Platform</h3>
            <p className="text-gray-700 leading-relaxed">
              PNGIO, including all software, designs, text, graphics, and trademarks, is our property and protected by copyright and trademark laws. You may not copy, modify, or distribute our platform without written permission.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">6.3 Third-Party Content</h3>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for ensuring you have the right to use any third-party content (fonts, images, etc.) you upload to PNGIO. We are not responsible for copyright violations resulting from your uploads.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Billing and Payment</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">7.1 Subscription Plans</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              PNGIO offers monthly subscriptions for Pro plans. Enterprise plans have custom pricing and contracts. All fees are in USD unless otherwise specified.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">7.2 Payment Processing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payments are processed through Stripe. By providing payment information, you authorize us to charge your payment method on a recurring basis until you cancel.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">7.3 Plan Limits</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each plan has usage limits (users, templates, storage) as described on our pricing page. If you exceed limits, you will be prompted to upgrade.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">7.4 Refunds</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a 14-day money-back guarantee for new Pro subscriptions. After 14 days, fees are non-refundable. Contact support for refund requests.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">7.5 Price Changes</h3>
            <p className="text-gray-700 leading-relaxed">
              We may change prices with 30 days' notice. Changes apply to new billing cycles; existing subscribers are grandfathered for 60 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Cancellation and Termination</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">8.1 Your Right to Cancel</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Your account remains active until the end of the current billing period</li>
              <li>You will not be charged for subsequent periods</li>
              <li>You can export your data before the end of your subscription</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">8.2 Our Right to Terminate</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may suspend or terminate your account if:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>You violate these Terms or our Acceptable Use Policy</li>
              <li>Your payment fails and is not resolved within 7 days</li>
              <li>We are required to do so by law</li>
              <li>You engage in fraudulent or illegal activity</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">8.3 Effect of Termination</h3>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your access to the platform will cease, and your data will be deleted after a 30-day grace period unless required for legal compliance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">9. Data and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our use of your personal information is governed by our Privacy Policy. Key points:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>We use multi-tenant architecture with complete data isolation between organizations</li>
              <li>All data is encrypted in transit and at rest</li>
              <li>We do not sell your data to third parties</li>
              <li>You can export or delete your data at any time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              For full details, see our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">10. Warranties and Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PNGIO is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security or accuracy of data</li>
              <li>Third-party integrations or services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We strive for 99.9% uptime for Pro and Enterprise customers but do not guarantee it. We are not responsible for data loss; you should maintain backups.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PNGIO SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages resulting from unauthorized access to your account</li>
              <li>Third-party actions or content</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">12. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless PNGIO from any claims, damages, or expenses (including legal fees) arising from your use of the platform, violation of these Terms, or infringement of third-party rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">13. Governing Law and Disputes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any disputes shall be resolved through:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
              <li>Good faith negotiation between parties</li>
              <li>Binding arbitration in San Francisco, California (for claims under $10,000)</li>
              <li>State or federal courts in San Francisco, California (for claims over $10,000)</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">14. Miscellaneous</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">14.1 Entire Agreement</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and PNGIO.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">14.2 Severability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision is found unenforceable, the remaining provisions remain in full effect.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">14.3 No Waiver</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our failure to enforce any right does not constitute a waiver of that right.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-6">14.4 Assignment</h3>
            <p className="text-gray-700 leading-relaxed">
              You may not assign these Terms without our written consent. We may assign our rights to any successor or affiliate.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:legal@pngio.com" className="text-purple-600 hover:underline">legal@pngio.com</a></p>
              <p className="text-gray-700"><strong>Support:</strong> <a href="mailto:support@pngio.com" className="text-purple-600 hover:underline">support@pngio.com</a></p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Design Street, San Francisco, CA 94102</p>
            </div>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <p className="text-gray-700">
              <strong>By using PNGIO, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
            </p>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
