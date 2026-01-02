import SEO from "@/components/SEO";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How we protect your privacy at Future Advice by Charm."
        url="/privacy"
      />
      <div className="container mx-auto mt-24 mb-20 px-6 md:px-0 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-primary-300">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto text-gray-200">
          <p className="mb-6 text-lg">
            We respect your privacy. We only collect the information you provide
            to us, such as your name, email, and any details you submit through
            our forms or bookings.
          </p>
          <p className="mb-6">
            We use cookies and analytics (including Google services) to improve
            your experience and understand how our site is used. You can control
            cookies in your browser settings.
          </p>
          <p className="mb-6">
            We never sell your data. We only share your information with trusted
            partners when necessary to provide our services or if required by
            law.
          </p>
          <p className="mb-6">
            You can contact us anytime to access, update, or delete your
            information.
          </p>
          <p>
            Questions? Please contact us via our official Facebook page:{" "}
            <a
              href="https://www.facebook.com/profile.php?id=61567142620648"
              className="text-primary-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Future Advice by Charm Facebook
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
