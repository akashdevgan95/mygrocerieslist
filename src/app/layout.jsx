import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Groceries List",
  description: "Most convenient way to manage your groceries list",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: 'My Groceries List | Most convenient way to manage your groceries list',
    description: 'The React Framework for the Web',
    url: 'https://mygrocerieslist.com',
    siteName: 'My Groceries List',
    images: [
      {
        url: '/og-image.png',
        width: 800,
        height: 600,
      },
      {
        url: '/og-image.png',
        width: 1800,
        height: 1600,
        alt: 'My Groceries List',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  );
}
