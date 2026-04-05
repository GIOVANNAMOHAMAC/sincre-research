import { MarketingLayout } from "@/components/layouts/marketing-layout";

export default function ContactPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">talk</span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition resize-none"
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-6">
                {/* Sales */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Sales Inquiries</h3>
                    <p className="text-gray-600 mb-2">Looking to get started with PNGIO for your team?</p>
                    <a href="mailto:sales@pngio.com" className="text-purple-600 font-semibold hover:underline">
                      sales@pngio.com
                    </a>
                  </div>
                </div>

                {/* Support */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Customer Support</h3>
                    <p className="text-gray-600 mb-2">Need help? Our support team is here for you.</p>
                    <a href="mailto:support@pngio.com" className="text-pink-600 font-semibold hover:underline">
                      support@pngio.com
                    </a>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Office</h3>
                    <p className="text-gray-600">
                      123 Design Street<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                <h3 className="font-bold mb-3">Response Time</h3>
                <p className="text-gray-600 mb-4">
                  We typically respond within 24 hours during business days. For urgent matters, Enterprise customers can reach us via priority support.
                </p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Mon - Fri: 9AM - 6PM PST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Quick answers to questions you may have
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Do I need a credit card to start?</h3>
                <p className="text-gray-600">
                  No! Our Free plan is completely free forever and doesn't require a credit card. You can upgrade to Pro or Enterprise at any time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Can I switch plans later?</h3>
                <p className="text-gray-600">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Is my data secure?</h3>
                <p className="text-gray-600">
                  Yes. We use enterprise-grade security with complete data isolation. Your organization's data is never shared with other tenants, and all data is encrypted in transit and at rest.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Do you offer custom Enterprise plans?</h3>
                <p className="text-gray-600">
                  Yes! Enterprise plans are fully customizable based on your organization's needs. Contact our sales team for a personalized quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
