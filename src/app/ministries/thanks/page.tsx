import type { Metadata } from "next";
import { ThanksPage } from "@/components/ThanksPage";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Page() {
  return <ThanksPage heading="Thank you!" body="We passed your note to the ministry leaders. Someone will reach out soon." />;
}
