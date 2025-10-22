// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { Analytics } from "@vercel/analytics/next";
import {
  ColorSchemeScript,
  DEFAULT_THEME,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Arimo } from "next/font/google";
import { QueryProvider } from "./providers/QueryProvider";

export const metadata = {
  title: "OnlineJobsPh App",
  description: "Browse jobs easily.",
};

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Specify the weights you need
  style: ["normal", "italic"],
  display: "swap", // Font display strategy
  variable: "--font-arimo", // CSS variable name
});

const theme = createTheme({
  fontFamily: `var(--font-arimo), ${DEFAULT_THEME.fontFamily}`,
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    // Use default theme if you want to provide default Mantine fonts as a fallback
    fontFamily: `var(--font-arimo), ${DEFAULT_THEME.fontFamily}`,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={arimo.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
