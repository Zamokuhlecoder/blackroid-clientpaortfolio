import type { Metadata } from "next";
import { ClientPortfolio } from "@/components/ClientPortfolio";

export const metadata: Metadata = {
  title: "Client portfolio preview",
  description: "Preview the Blackroid client project workspace.",
  alternates: { canonical: "/portfolio" },
  robots: { index: false, follow: false },
};

export default function PortfolioPage() {
  return <ClientPortfolio />;
}
