import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskLite",
  description: "Task management made simple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative bg-black text-white`}
      >
        {/* Background Layer */}
        <div className="fixed inset-0 -z-50 bg-black">
          {/* Particle Background */}
          <Particles
            particleCount={200}
            particleSpread={10}
            speed={0.15}
            particleColors={["#FFFFFF", "#A0E9FF", "#FFB4A2"]} // soft white + blue + peach tones
            particleBaseSize={80}
            alphaParticles={true}
            moveParticlesOnHover={false}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>

        {/* Foreground Content */}
            <div className="relative z-10 flex flex-col min-h-screen flex-1">
              <Header />
          {children}
              <Footer />
        </div>
      </body>
    </html>
  );
}
