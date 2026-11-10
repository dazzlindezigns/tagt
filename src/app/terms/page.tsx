import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock, LegalPage } from "@/components/LegalPage";
import { text } from "@/lib/content";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Terms() {
  const NAME = text("0-every-page", 23);
  return (
    <LegalPage
      title="Terms & Conditions"
      intro={
        <>
          Welcome to the website of {NAME} (&ldquo;TAGT,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using this website, you agree
          to these terms. If you don&apos;t agree, please don&apos;t use the website.
        </>
      }
    >
      <h2>Using this website</h2>
      <p>Please use this website for lawful, personal purposes. Please don&apos;t:</p>
      <ul>
        <li>send false information, or information about someone else without their permission;</li>
        <li>post anything hateful, harassing, or inappropriate;</li>
        <li>try to break into, overload, or disrupt the website.</li>
      </ul>

      <h2>Our content</h2>
      <p>
        Our sermons, videos, photos, logo, and writing belong to {NAME} or are used with permission. You are welcome to watch,
        read, and share links to them for personal, non-commercial use. Please ask us before copying, selling, or republishing them.
      </p>

      <h2>What you send us</h2>
      <p>
        When you send us a form, please make sure the information is accurate. If you share a prayer request on our prayer wall,
        you give us permission to show it on our website. We may edit or remove anything posted on our website at any time.
      </p>

      <h2>Giving</h2>
      <ul>
        <li>Gifts to {NAME} are voluntary and are generally not refundable.</li>
        <li>If you made a mistake, such as the wrong amount or a duplicate gift, please contact us as soon as possible and we will work with you to correct it.</li>
        <li>Online gifts are processed by a third-party payment processor. Your card or bank details go directly to them and are never stored on our website.</li>
        <li>Gifts are tax-deductible to the extent allowed by law. We send receipts and year-end giving statements. No goods or services are provided in exchange for gifts unless we tell you otherwise.</li>
        <li>We honor gifts given to a specific fund whenever we can. The church has final say over how all gifts are used to carry out its ministry.</li>
        <li>Payments for events (like retreats or conferences) are not gifts. Refunds for events follow the policy listed on that event&apos;s page.</li>
      </ul>

      <h2>Other websites and services</h2>
      <p>
        Our website links to and shows content from other services, such as YouTube, Google Maps, Facebook, and our payment
        processor. We are not responsible for their content or how they handle your information. Their own terms and privacy
        policies apply.
      </p>

      <h2>No guarantees</h2>
      <p>
        We work to keep this website accurate and available, but it is provided &ldquo;as is.&rdquo; Service times, events, and
        details can change, and the website may sometimes be unavailable.
      </p>

      <h2>Limit of liability</h2>
      <p>
        To the fullest extent allowed by law, {NAME} is not liable for any indirect or consequential damages that come from using
        this website.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we collect and use your information.
      </p>

      <h2>Texas law</h2>
      <p>These terms are governed by the laws of the State of Texas.</p>

      <h2>Changes to these terms</h2>
      <p>If we change these terms, we will post the new version here and update the date at the top.</p>

      <h2>Contact us</h2>
      <ContactBlock />
    </LegalPage>
  );
}
