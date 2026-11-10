import type { Metadata } from "next";
import { ThanksPage } from "@/components/ThanksPage";

export const metadata: Metadata = { title: "Prayer request received", robots: { index: false } };

export default function Page() {
  return <ThanksPage heading="We received your request" body="Thank you for letting us pray with you." />;
}
