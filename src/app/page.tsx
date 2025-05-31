import React from "react";
import Head from "next/head";
import Home from "../components/Home";

export default function Page() {
  return (
    <>
      <Head>
        <title>
          Quality Blinds | Premium Blinds, Curtains, Shutters & Awnings
          Australia
        </title>
        <meta
          name="description"
          content="Quality Blinds is a leading manufacturer and installer of premium blinds, curtains, shutters, and awnings in Australia. Custom solutions for homes and businesses since 1998."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Quality Blinds | Premium Blinds, Curtains, Shutters & Awnings Australia"
        />
        <meta
          property="og:description"
          content="Quality Blinds is a leading manufacturer and installer of premium blinds, curtains, shutters, and awnings in Australia. Custom solutions for homes and businesses since 1998."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.qualityblinds.com.au/" />
        <meta property="og:image" content="/images/og-quality-blinds.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Quality Blinds | Premium Blinds, Curtains, Shutters & Awnings Australia"
        />
        <meta
          name="twitter:description"
          content="Quality Blinds is a leading manufacturer and installer of premium blinds, curtains, shutters, and awnings in Australia. Custom solutions for homes and businesses since 1998."
        />
        <meta name="twitter:image" content="/images/og-quality-blinds.jpg" />
        <link rel="canonical" href="https://www.qualityblinds.com.au/" />
      </Head>
      <main id="main-content">
        <Home />
      </main>
    </>
  );
}
