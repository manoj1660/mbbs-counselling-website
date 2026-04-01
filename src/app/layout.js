import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QuickPopupForm from "@/components/AdmissionPopup";

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
  description: "MBBS Study Abroad is your trusted partner for direct admissions and transparent guidance...",
  icons: {
    icon: "/metaicon.png", 
  },
  // 👇 Ye wala section add kar do Google Verification ke liye
  verification: {
    google: "pNedgnfHPevX6PeNE1m0c2FDHd8O51iDC4r1xXwRMEg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        <QuickPopupForm/>
      </body>
    </html>
  );
}