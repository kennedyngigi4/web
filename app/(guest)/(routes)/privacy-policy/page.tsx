import React from 'react'

const PrivacyPolicy = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Privacy Policy</h1>
      <p className="mb-8 text-sm text-gray-500">Last Updated: June 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p>
          Kenautos ("we", "our", "the platform") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and protect your personal information
          when you use our website, mobile apps, or any of our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Personal information: name, email, phone number, location</li>
          <li>Vehicle listings and descriptions you submit</li>
          <li>Messages or inquiries sent through the platform</li>
          <li>Payment information for services (where applicable)</li>
          <li>Usage data: IP address, browser type, pages visited</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>To provide and improve our platform and services</li>
          <li>To communicate with you about your account or listings</li>
          <li>To process payments for paid services</li>
          <li>To display relevant content and recommendations</li>
          <li>To promote safety and prevent fraud</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share your data with:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Service providers helping us operate the platform (e.g., payment processors)</li>
          <li>Law enforcement if required by law</li>
          <li>Other users (for example, when you list a car or send a message)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Cookies & Tracking</h2>
        <p>
          We use cookies and similar technologies to improve your experience and analyze usage.
          You can manage cookie preferences in your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information.
          However, no method of transmission over the internet is 100% secure.
          We encourage users to take precautions as well.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request corrections to your data</li>
          <li>Request deletion of your data (subject to legal requirements)</li>
          <li>Opt out of marketing communications</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Third-Party Links</h2>
        <p>
          Our platform may contain links to third-party websites.
          We are not responsible for the privacy practices of those websites.
          We encourage you to read their privacy policies separately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
        <p>
          Kenautos is not intended for children under 18.
          We do not knowingly collect personal information from minors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally.
          We encourage you to review this page periodically to stay informed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
        <p>
          For any questions about this Privacy Policy, contact us at:
        </p>
        <ul className="mt-2 space-y-1">
          <li>📧 <a href="mailto:legal@kenautos.co.ke" className="text-orange-600 hover:underline">legal@kenautos.co.ke</a></li>
          <li>📞 +254 110 276 248</li>
        </ul>
      </section>
    </main>
  )
}

export default PrivacyPolicy