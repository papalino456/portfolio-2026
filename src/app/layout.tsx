import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sebastian Barrio | Systems Architect",
  description: "Mechatronics and Software Engineer specializing in Robotics and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
