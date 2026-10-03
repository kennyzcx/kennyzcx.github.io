import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "kenny",
  description: "kenny's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <SiteHeader />
          <main className="content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
