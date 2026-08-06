export const metadata = {
  title: "Privacy Policy | MBBS Study Abroad",
  description: "Read our privacy policy regarding how we handle, protect, and process student information.",
  alternates: {
    canonical: "https://www.mbbsstudyabroad.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <p>
          At <strong>MBBS Study Abroad</strong>, we respect your privacy and are committed to protecting the personal information you share with us during your admission counseling process.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p>
          We collect personal details such as your name, email address, phone number, NEET score, and academic background when you fill out contact/application forms on our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p>
          The information collected is used solely to provide guidance regarding MBBS admissions abroad, assist with university application procedures, and communicate visa and eligibility requirements.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection & Sharing</h2>
        <p>
          We do not sell or lease your personal information to third-party marketers. Your details are only shared with partner universities or official processing entities strictly necessary for admission purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us via our official website contact channels.
        </p>
      </section>
    </main>
  );
}