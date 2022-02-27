import Head from "next/head";
import Header from "../components/Header";
import Stats from "../components/Stats";
import About from "../components/About";
import Demo from "../components/Demo";
import redisClient from "../lib/redis";

export default function HomePage({ stats }) {
  return (
    <>
      <Head>
        <title>| foocaptcha |</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Stats stats={stats}/>
      <About />
      <Demo />
    </>
  )
}

export async function getServerSideProps(context) {
  const totalCaptchas = await redisClient.get('fc:totalCaptchas');
  const totalViewed = await redisClient.get('fc:totalViewed');
  const totalVerified = await redisClient.get('fc:totalVerified');

  return {
    props: {
      stats: {
        totalCaptchas,
        totalViewed,
        totalVerified
      }
    }
  };
}
