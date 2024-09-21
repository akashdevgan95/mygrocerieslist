import "../styles/globals.css";

export const metadata = {
  title: "My Groceries List",
  description: "Most convenient way to manage your groceries list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
