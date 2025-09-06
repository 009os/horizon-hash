import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: `${CMS_NAME} - Trading & Finance Insights`,
  description: `A blog about trading strategies, technical analysis, and financial insights by Omji Shukla.`,
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
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* Preload crypto images for faster loading */}
        <link rel="preload" as="image" href="/btc.png" />
        <link rel="preload" as="image" href="/etherum.png" />
        <link rel="preload" as="image" href="/shib.png" />
        <link rel="preload" as="image" href="/sol.png" />
        <link rel="preload" as="image" href="/xrp.png" />
        
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
                    return window.MathJax.startup.defaultPageReady().then(() => {
                      console.log('MathJax is ready');
                    });
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
      <body className="font-body body-text">
        <ThemeSwitcher />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
