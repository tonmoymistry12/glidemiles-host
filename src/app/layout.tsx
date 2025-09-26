import type { Metadata } from "next";
import { Roboto, Kalam, Caveat, Caveat_Brush, Protest_Revolution } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: "--font-roboto"
});

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: "--font-kalam"
});
const protest = Protest_Revolution({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-protest"
});
const caveat = Caveat({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-caveat"
});
const CaveatBrush = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-caveat-brush"
});

export const metadata: Metadata = {
  title: "Glidemiles Partner - List Your Property & Maximize Revenue",
  description: "Join Glidemiles Partner platform to list your property and unlock better benefits. Increase bookings, boost revenue, and reach more travelers worldwide with our comprehensive property management tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${kalam.variable} ${protest.variable} ${caveat.variable} ${CaveatBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
