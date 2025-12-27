import Footer from "@/app/_components/footer";
import ElegantHeader from "@/app/_components/elegant-header";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: `${CMS_NAME}`,
  description: `A blog about trading strategies, technical analysis, and financial insights by Horizon Hash.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo.webp"
        />
        <link
          rel="icon"
          type="image/webp"
          sizes="32x32"
          href="/logo.webp"
        />
        <link
          rel="icon"
          type="image/webp"
          sizes="16x16"
          href="/logo.webp"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/logo.webp"
          color="#000000"
        />
        <link rel="shortcut icon" href="/logo.webp" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* MathJax for mathematical equations */}
        <script
          id="mathjax-config"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$']],
                  displayMath: [['$$', '$$']],
                  processEscapes: true
                },
                svg: {
                  fontCache: 'global'
                },
                options: {
                  skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                  ignoreHtmlClass: 'tex2jax_ignore'
                },
                startup: {
                  pageReady: () => {
                    return window.MathJax.startup.defaultPageReady();
                  }
                }
              };
            `
          }}
        />
        <script
          id="mathjax-script"
          type="text/javascript"
          async
          src="https://polyfill.io/v3/polyfill.min.js?features=es6"
        />
        <script
          id="mathjax-main"
          type="text/javascript"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />

        

      </head>
      <body className="font-body body-text bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <ThemeSwitcher />
        <ElegantHeader />
        <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-black to-gray-800">{children}</div>
      </body>
    </html>
  );
}
