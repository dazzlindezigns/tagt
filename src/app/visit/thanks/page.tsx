import type { Metadata } from "next";
import { ThanksPage } from "@/components/ThanksPage";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Page() {
  return <ThanksPage heading="Thank you!" body="We can't wait to meet you. Someone from our team will reach out before your visit." />;
}
