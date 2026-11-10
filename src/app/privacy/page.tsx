import type { Metadata } from "next";
import { ContactBlock, LegalPage } from "@/components/LegalPage";
import { text } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  const NAME = text("0-every-page", 23);
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <>
          {NAME} (&ldquo;TAGT,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a church in Austin, Texas. This policy explains what
          information we collect through our website, how we use it, and the choices you have. We treat what you share with us,
          especially prayer requests, with care.
        </>
      }
    >
      <h2>Information you give us</h2>
      <p>We only collect information you choose to send us through a form on this website:</p>
      <ul>
        <li><strong>Plan your visit:</strong> your name, email, phone number, how many people are coming, and anything you tell us about your visit.</li>
        <li><strong>Prayer requests:</strong> your name, an email or phone number if you give one, your request, and who you want to be able to see it.</li>
        <li><strong>Ministry and event sign-ups:</strong> your name, contact details, and anything you add for the leaders.</li>
        <li><strong>Giving:</strong> your name, email, the amount, the fund, and how often you give. Your card or bank details go directly to our payment processor on their secure page. They never pass through or stay on our website.</li>
      </ul>

      <h2>Information collected automatically</h2>
      <p>
        Like most websites, our hosting provider keeps basic technical logs, such as your IP address, browser type, and the pages
        you visit. We use these only to keep the website running and secure. Our website uses only the cookies it needs to work.
        If we add website analytics in the future, we will update this policy first.
      </p>
      <p>
        Some pages show content from other companies, such as our videos from YouTube and our map from Google Maps. When you view
        or play that content, those companies may collect information under their own privacy policies.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To welcome you and follow up on your visit.</li>
        <li>To pray with you and, if you asked, to reach out to you.</li>
        <li>To connect you with a ministry or event you signed up for.</li>
        <li>To process your gifts and send receipts and year-end giving statements.</li>
        <li>To answer you when you contact us.</li>
      </ul>

      <h2>Prayer requests</h2>
      <p>You choose who can see your prayer request, and we follow that choice:</p>
      <ul>
        <li><strong>Pastors only:</strong> seen only by our pastors.</li>
        <li><strong>Prayer team:</strong> seen by our pastors and our prayer team.</li>
        <li>
          <strong>Prayer wall:</strong> your request may be shown on our website with your first name only. You can ask us to take
          it down at any time.
        </li>
      </ul>

      <h2>How we share information</h2>
      <p>
        <strong>We never sell or rent your personal information.</strong> We share it only with companies that help us run the
        website and our ministry, such as our website host, email service, text message service, and payment processor. They may
        use it only to provide those services to us. We may also share information if the law requires it or to protect
        someone&apos;s safety.
      </p>

      <h2>Text messages</h2>
      <p>
        If you agree to receive text messages from us, we use your number only to send the messages you signed up for. Message
        and data rates may apply. Reply STOP to stop receiving texts, or HELP for help.{" "}
        <strong>
          We do not share your mobile number or text message consent with third parties or affiliates for their marketing or
          promotional purposes.
        </strong>
      </p>

      <h2>Children</h2>
      <p>
        This website is not meant for children under 13 to use on their own, and we do not knowingly collect personal information
        from them through it. Parents and guardians handle any information about their children. If you believe a child under 13
        has sent us personal information, please contact us and we will delete it.
      </p>

      <h2>Keeping your information safe</h2>
      <p>
        We use secure connections (HTTPS) and limit who on our staff can see your information to the people who need it. No system
        is perfectly secure, but we work to protect what you share with us.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep information only as long as we need it for the reasons above. Giving records are kept as long as the law requires
        for tax and accounting purposes.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can ask to see, correct, or delete the personal information we have about you.</li>
        <li>You can unsubscribe from our emails using the link in any email, and stop texts by replying STOP.</li>
        <li>You can ask us to remove a prayer request at any time.</li>
      </ul>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we will post the new version here and update the date at the top.</p>

      <h2>Contact us</h2>
      <p>Questions about your privacy? Reach us at:</p>
      <ContactBlock />
    </LegalPage>
  );
}
