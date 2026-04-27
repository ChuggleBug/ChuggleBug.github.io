
import "./globals.css";

import MainHeader from "@/components/MainHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-google-analytics-opt-out=""
    >
      <body className="min-h-full flex flex-col ">
        <MainHeader/>
        {children}
      </body>
    </html >
  );
}
