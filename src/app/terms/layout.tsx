import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Quality Blinds Australia",
  description:
    "Terms and conditions for Quality Blinds Australia. Review our service terms, policies and commercial conditions.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms and Conditions | Quality Blinds Australia",
    description:
      "Terms and conditions for Quality Blinds Australia. Review our service terms, policies and commercial conditions.",
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
