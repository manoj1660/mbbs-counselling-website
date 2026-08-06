export const metadata = {
  title: "Terms & Conditions | MBBS Study Abroad",
  description: "Read the terms and conditions for using our educational counseling services.",
  alternates: {
    canonical: "https://www.mbbsstudyabroad.com/terms-and-conditions",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">Last updated: 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <p>
          Welcome to <strong>MBBS Study Abroad</strong>. By accessing and using our website and consultancy services, you agree to comply with the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Counseling Services</h2>
        <p>
          We provide guidance and counseling services for Indian students seeking MBBS admissions in abroad universities (NMC & WHO approved). Final university admission depends on student eligibility, NEET scores, and official university approvals.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Accuracy of Information</h2>
        <p>
          While we strive to provide accurate fee structures, eligibility guidelines, and university rankings, official university and government guidelines are subject to change. Students are encouraged to verify official university circulars during counseling.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p>
          All content, logos, and materials on this website belong to MBBS Study Abroad and may not be reproduced without prior permission.
        </p>
      </section>
    </main>
  );
}