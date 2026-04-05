import Link from "next/link";
import { MarketingLayout } from "@/components/layouts/marketing-layout";

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              We're on a mission to empower <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">every sales team</span>
            </h1>
            <p className="text-xl text-gray-600">
              PNGIO is a visual content platform designed specifically for sales teams who need to create professional marketing materials without being designers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                PNGIO was born from a simple observation: sales teams spend too much time waiting for marketing to create collateral, and when they try to do it themselves, brand consistency suffers.
              </p>
              <p>
                We believe that every sales professional should have access to great design tools without compromising brand consistency. PNGIO bridges the gap between marketing's need for control and sales' need for speed.
              </p>
              <p>
                Traditional design tools are either too complex for non-designers or too restrictive for creative work. Generic tools like Canva lack the enterprise controls needed for brand consistency. PNGIO solves both problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Speed</h3>
              <p className="text-gray-600">
                Sales teams move fast. Our tools should too. We're obsessed with making content creation as quick and painless as possible.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-gray-600">
                Your brand is precious. We give marketing teams the controls they need to maintain consistency while empowering sales.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simplicity</h3>
              <p className="text-gray-600">
                Design tools shouldn't require a degree in design. We make powerful features accessible to everyone on your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Built for Teams</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                PNGIO is multi-tenant from the ground up. Each organization operates in a completely isolated workspace with role-based access control. Your data is yours, secure, and never shared with other tenants.
              </p>
              <p>
                We've built PNGIO with modern technology that scales: Next.js 14 for blazing-fast performance, Supabase for enterprise-grade security, and Fabric.js for powerful canvas editing. Every decision we make is focused on delivering the best experience for your team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Enterprise Security</h3>
                  <p className="text-gray-600">Complete data isolation with row-level security</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Lightning Fast</h3>
                  <p className="text-gray-600">Optimized for speed with edge deployment</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Always Available</h3>
                  <p className="text-gray-600">99.9% uptime SLA for Enterprise customers</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Scales With You</h3>
                  <p className="text-gray-600">From 5 to 5,000 users seamlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of teams creating stunning visual content with PNGIO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
