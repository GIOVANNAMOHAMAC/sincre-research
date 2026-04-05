import { MarketingLayout } from "@/components/layouts/marketing-layout";

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-center text-gray-600">Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to PNGIO ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our visual content platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using PNGIO, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Name and email address</li>
              <li>Company/organization name</li>
              <li>Password (encrypted)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Content and Usage Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use our platform, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Templates, projects, and designs you create</li>
              <li>Brand assets you upload (logos, images, fonts)</li>
              <li>Activity logs (actions taken within the platform)</li>
              <li>Usage analytics (features used, time spent, exports generated)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Technical Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log data (access times, pages viewed, errors)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Provide and maintain the service:</strong> Create and manage your account, process payments, and deliver platform features</li>
              <li><strong>Improve our platform:</strong> Analyze usage patterns, fix bugs, and develop new features</li>
              <li><strong>Communicate with you:</strong> Send service updates, security alerts, and support messages</li>
              <li><strong>Marketing (with consent):</strong> Send promotional emails about new features and upgrades (you can opt out anytime)</li>
              <li><strong>Security and fraud prevention:</strong> Detect and prevent unauthorized access and misuse</li>
              <li><strong>Legal compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Multi-Tenant Isolation:</strong> PNGIO uses a multi-tenant architecture with complete data isolation. Your organization's data is logically separated from other tenants using row-level security policies. No other organization can access your data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using industry-standard encryption (AES-256).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Infrastructure:</strong> We use Supabase (PostgreSQL) for database hosting and Vercel for application hosting, both of which maintain SOC 2 compliance and implement enterprise-grade security measures.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Access Controls:</strong> Role-based access control ensures that only authorized users within your organization can access your data based on their assigned roles (Owner, Admin, Staff).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party services (Stripe for payments, Resend for emails, Supabase for hosting) under strict confidentiality agreements</li>
              <li><strong>Team Members:</strong> Within your organization, based on role-based permissions you configure</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Data Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>Object:</strong> Object to certain data processing activities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us at <a href="mailto:privacy@pngio.com" className="text-purple-600 hover:underline">privacy@pngio.com</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze platform usage (via Vercel Analytics)</li>
              <li>Improve performance and user experience</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings, but disabling them may affect platform functionality.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your information for as long as your account is active or as needed to provide services. When you delete your account:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Personal data is deleted within 30 days</li>
              <li>Content (templates, projects, exports) is permanently deleted</li>
              <li>Some data may be retained for legal compliance (e.g., payment records for tax purposes)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission for GDPR compliance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              PNGIO is not intended for use by children under 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through the platform. Continued use after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:privacy@pngio.com" className="text-purple-600 hover:underline">privacy@pngio.com</a></p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Design Street, San Francisco, CA 94102</p>
            </div>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
}
