import Navigation from "@/components/Navigation/Navigation";
import SessionProvider from "@/lib/Providers/SessionProvider";
import { PrimeReactProvider } from "primereact/api";

import "../../prime-react-theme/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";

import "./globals.css";
import StyledComponentsRegistry from "@/lib/Registry/Registry";
import { Flex } from "@/components/shared/Flex/Flex.styles";

export const metadata = {
  title: "Time tracker",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <PrimeReactProvider>
            <SessionProvider>
              <Navigation />
              {children}
            </SessionProvider>
          </PrimeReactProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
