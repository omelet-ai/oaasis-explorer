import dynamic from 'next/dynamic';
import Head from 'next/head';

const LandingPage = dynamic(
  () => import('@/components/LandingPage'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>OaaSIS — Decision OS by Omelet AI</title>
        <meta name="description" content="OaaSIS - Optimization AI Agent Platform. Decision OS that empowers your enterprise to build and deploy optimization solutions without code." />
        <meta property="og:title" content="OaaSIS — Decision OS by Omelet AI" />
        <meta property="og:description" content="Optimization AI Agent Platform. Build enterprise optimization solutions without code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPage />
    </>
  );
}
