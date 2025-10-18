// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  DEFAULT_THEME,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { QueryProvider } from "./providers/QueryProvider";

export const metadata = {
  title: "OLJ App",
  description: "I have followed setup instructions carefully",
};

const theme = createTheme({
  fontFamily: "Arimo, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    // Use default theme if you want to provide default Mantine fonts as a fallback
    fontFamily: `Arimo, ${DEFAULT_THEME.fontFamily}`,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
