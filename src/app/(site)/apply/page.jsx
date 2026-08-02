// src/app/apply/page.jsx
import AdmissionForm from "./AdmissionForm"; // path check kar lena

export const metadata = {
  title: "Apply for MBBS Abroad | Free Counselling 2026",
  description: "Fill out the form to get personalized roadmap and counselling for MBBS abroad.",
  alternates: {
    canonical: "/apply", // Agar page ka path /apply hai toh /apply likho
  },
};

export default function ApplyPage() {
  return <AdmissionForm />;
}