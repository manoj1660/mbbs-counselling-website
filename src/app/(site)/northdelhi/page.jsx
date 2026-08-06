// src/app/northdelhi/page.jsx  <-- Clean Server Component
import NorthDelhiOffice from "./NorthDelhiOffice"; // Import path check kar lein

export const metadata = {
  title: "MBBS Global North Delhi Office | Rohini Regional Center",
  description: "Visit our North Delhi regional office in Rohini Sector-9 for expert MBBS abroad counselling and admissions assistance.",
  alternates: {
    canonical: "/northdelhi", // Clean dynamic relative canonical URL
  },
};

export default function Page() {
  return <NorthDelhiOffice />;
}