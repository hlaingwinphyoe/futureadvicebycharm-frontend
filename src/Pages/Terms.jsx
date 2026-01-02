import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="The rules for using Future Advice by Charm."
        url="/terms"
      />
      <div className="container mx-auto mt-24 mb-20 px-6 md:px-0 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-primary-300">
          Terms and Conditions
        </h1>
        <div className="max-w-3xl mx-auto text-gray-200">
          <p className="mb-6 text-lg">
            By using Future Advice by Charm, you agree to these terms.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>You must be at least 13 years old to use our services.</li>
            <li>
              All content is for informational and entertainment purposes only.
            </li>
            <li>
              Do not misuse our website or try to access it in unauthorized
              ways.
            </li>
            <li>
              We are not responsible for any decisions you make based on our
              content or services.
            </li>
            <li>
              We may update these terms at any time. Continued use means you
              accept the new terms.
            </li>
          </ul>
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
