import "@/styles/globals.css";
import Providers from "./providers";
import AppBar from "@/components/AppBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar></AppBar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
