import type {
  Metadata,
} from "next";
import Script from "next/script";
import {
  Nunito_Sans,
} from "next/font/google";
import "./globals.css";

const nunitoSans =
  Nunito_Sans({
    subsets: [
      "latin",
    ],
    variable:
      "--font-main",
    display:
      "swap",
  });

export const metadata:
  Metadata = {
    title:
      "ShipSpark — Release Intelligence",
    description:
      "Turn product releases, customer demand, and source activity into evidence backed launch decisions.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={
        nunitoSans.variable
      }
    >
      <body className="min-h-screen bg-[#070a0f] font-[var(--font-main)] text-[#f6f8fb] antialiased">
        {process.env.NODE_ENV === "development" && (
          <Script
            id="shipspark-extension-noise-guard"
            strategy="beforeInteractive"
          >
            {`
              (() => {
                const METAMASK_EXTENSION =
                  "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn";

                const isMetaMaskNoise = (value) => {
                  let text = "";

                  try {
                    if (
                      value &&
                      typeof value === "object"
                    ) {
                      text = [
                        value.message,
                        value.stack,
                        value.name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                    } else {
                      text = String(value || "");
                    }
                  } catch {
                    return false;
                  }

                  return (
                    text.includes(
                      METAMASK_EXTENSION
                    ) ||
                    /Failed to connect to MetaMask|MetaMask extension not found/i.test(
                      text
                    )
                  );
                };

                window.addEventListener(
                  "unhandledrejection",
                  (event) => {
                    if (
                      !isMetaMaskNoise(
                        event.reason
                      )
                    ) {
                      return;
                    }

                    event.preventDefault();
                    event.stopImmediatePropagation();
                  },
                  true
                );

                window.addEventListener(
                  "error",
                  (event) => {
                    const source =
                      event.filename || "";

                    const message =
                      event.message || "";

                    if (
                      !source.includes(
                        METAMASK_EXTENSION
                      ) &&
                      !isMetaMaskNoise(
                        message
                      )
                    ) {
                      return;
                    }

                    event.preventDefault();
                    event.stopImmediatePropagation();
                  },
                  true
                );
              })();
            `}
          </Script>
        )}

        {children}
      </body>
    </html>
  );
}
