import React from 'react'

const TermsConditions = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Terms & Conditions</h1>
      <p className="mb-8 text-sm text-gray-500">Last Updated: June 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p>
          Welcome to <strong>Kenautos</strong> ("we", "our", "the platform"). By accessing or
          using Kenautos.com or any of our services (including mobile apps, WhatsApp,
          and social media), you agree to comply with and be bound by these Terms and Conditions.
          If you do not agree, please do not use the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Scope of Services</h2>
        <p>
          Kenautos is an open automotive marketplace offering services such as:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Vehicle listings (cars, motorbikes, spares)</li>
          <li>Assisted selling services</li>
          <li>Luxury and chauffeured car hire</li>
          <li>Spare parts marketplace</li>
          <li>"Find Me a Car" service (KES 2,000 fee — mechanic fees excluded)</li>
          <li>Dealer advertising packages and promotions</li>
        </ul>
        <p className="mt-2">
          Kenautos does not sell vehicles directly. Our role is to connect buyers and sellers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
        <p>By using Kenautos, you agree to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Provide accurate and truthful information</li>
          <li>Not upload fraudulent or illegal content</li>
          <li>Perform due diligence before transactions</li>
          <li>Follow Kenyan laws related to automotive sales</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Seller Terms</h2>
        <p>
          Sellers can post vehicles freely or choose paid packages. Listings must be accurate and
          not misleading. Kenautos reserves the right to remove listings that violate rules.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Buyer Terms</h2>
        <p>
          Buyers are responsible for verifying vehicle condition and authenticity. Kenautos does not
          guarantee any listing or transaction outcome. The "Find Me a Car" fee (KES 2,000) covers
          the service only — inspection fees are separate.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Luxury Car Hire Terms</h2>
        <p>
          Kenautos only offers <strong>luxury and chauffeured car hire</strong> for weddings,
          events, corporate, and hotel transfers. Bookings are subject to confirmation and payment
          terms communicated in advance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Spares & Parts Marketplace</h2>
        <p>
          Buyers should verify authenticity and compatibility of spare parts. Kenautos offers no
          warranty on behalf of sellers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Fees & Payments</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>"Find Me a Car" — KES 2,000 (non-refundable)</li>
          <li>Subscription packages — as published</li>
          <li>Car hire — per booking terms</li>
          <li>Assisted Selling — agreed commission</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Platform Conduct</h2>
        <p>Users must not post offensive, fraudulent, or illegal content or attempt to defraud others.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">10. Disclaimer & Liability</h2>
        <p>
          Kenautos cannot be held liable for fraud, false listings, or damages resulting from user
          interactions. We encourage users to perform their own due diligence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">11. Intellectual Property</h2>
        <p>
          The Kenautos name, logo, and content are property of Kenautos. You may not reproduce or
          misuse our content without permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">12. Privacy</h2>
        <p>Your use of Kenautos is subject to our <strong>Privacy Policy</strong>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">13. Changes to Terms</h2>
        <p>
          Kenautos may update these Terms. Continued use of the platform after updates constitutes
          acceptance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">14. Governing Law</h2>
        <p>These terms are governed by the laws of Kenya.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">15. Contact Us</h2>
        <p>
          For any questions, contact us at:
        </p>
        <ul className="mt-2 space-y-1">
          <li>📧 <a href="mailto:legal@kenautos.co.ke" className="text-orange-600 hover:underline">legal@kenautos.co.ke</a></li>
          <li>📞 +254 110 276 248</li>
        </ul>
      </section>
    </main>
  )
}

export default TermsConditions