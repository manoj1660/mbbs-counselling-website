import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdmissionPopup from "@/components/AdmissionPopup";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MBBS Study Abroad - Your Gateway to Global Medical Education",
  description: "MBBS Study Abroad is your trusted partner for direct admissions and transparent guidance to top medical universities in Russia, Kazakhstan, and beyond. We empower medical aspirants with personalized counseling, expert support, and a seamless application process. Start your journey to becoming a global medical professional with us today!",
  icons: {
    icon: "/metaicon.png", // or "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <AdmissionPopup />
      </body>
    </html>
  );
}
