import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Anand Jaiswal - Full Stack Developer",
  description: "Creative full-stack developer specializing in modern web technologies, UI/UX design, and innovative digital solutions.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "UI/UX"],
  authors: [{ name: "Anand Jaiswal" }],
  creator: "Anand Jaiswal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anandjaiswal.dev",
    title: "Anand Jaiswal - Full Stack Developer",
    description: "Creative full-stack developer specializing in modern web technologies, UI/UX design, and innovative digital solutions.",
    siteName: "Anand Jaiswal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Jaiswal - Full Stack Developer",
    description: "Creative full-stack developer specializing in modern web technologies, UI/UX design, and innovative digital solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen">
            <ScrollProgress />
            <Navigation />
            <main className="pt-20 md:pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
