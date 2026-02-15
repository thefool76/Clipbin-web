import type { Metadata } from "next";
import Image from "next/image";
import { ClipViewer } from "@/components/clip-viewer";
import appLogo from "@/Assests/app logo.png";

const SHORT_CODE_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;

export async function generateMetadata({
  params
}: {
  params: Promise<{ shortCode: string }>;
}): Promise<Metadata> {
  const { shortCode } = await params;
  const validShortCode = SHORT_CODE_PATTERN.test(shortCode);

  if (!validShortCode) {
    return {
      title: "Clip",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: `Clip ${shortCode}`,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function ClipPage({
  params
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  return (
    <main className="clip-route-shell">
      <header className="home-topbar clip-route-topbar">
        <a className="brand-mark clip-route-brand-center" href="/" aria-label="Go to Clipbin home">
          <Image src={appLogo} alt="Clipbin logo" className="home-logo" priority />
          <span>Clipbin</span>
        </a>
      </header>
      <ClipViewer shortCode={shortCode} />
    </main>
  );
}
