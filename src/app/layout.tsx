import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { text } from "@/lib/content";
import { address, hrefFrom, site } from "@/lib/site";

const NAME = text("0-every-page", 8);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${NAME} | Austin, TX`, template: `%s | ${NAME}` },
  description: text("1-home", 3),
  openGraph: { siteName: NAME, type: "website", locale: "en_US", images: [{ url: "/logo-512.png", width: 512, height: 512 }] },
};

export const viewport: Viewport = { themeColor: "#1A0B2E" };

function ChurchSchema() {
  const a = address();
  const [city, rest = ""] = a.cityLine.split(",").map((s) => s.trim());
  const [region, postalCode] = rest.split(/\s+/);
  const sameAs = [hrefFrom(text("0-every-page", 28)), hrefFrom(text("0-every-page", 29))].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: NAME,
    url: site.url,
    logo: `${site.url}/logo-512.png`,
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: city, addressRegion: region, postalCode, addressCountry: "US" },
    ...(sameAs.length ? { sameAs } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-purple-950">
          Skip to content
        </a>
        <ChurchSchema />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
