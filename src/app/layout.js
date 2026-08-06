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
  metadataBase: new URL("https://www.mbbsstudyabroad.com"),
  title: "MBBS Global - Your Gateway to Global Medical Education",
  description: "Official portal for MBBS Global. Explore top NMC & WHO recognized medical universities in Russia, Uzbekistan, Kazakhstan, and more.",
  icons: {
    icon: "/images/logo1.png", 
  },
  // alternates: {
  //   canonical: "https://www.mbbsstudyabroad.com",
  // },
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