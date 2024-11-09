import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import buildClient from "@/hooks/build-client";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mapme",
  description: "An App to play with maps",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = buildClient({});

  let data;
  try {
    data = (await client.get("/api/users/current-user")).data;
    // Redirect if currentUser is not found
    if (!data.currentUser) {
      redirect("/auth/signin");
    }
  } catch (err) {}

  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar currentUser={data?.currentUser}/>
        {children}
      </body>
    </html>
  );
}
