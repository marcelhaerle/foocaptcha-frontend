import Header from "../components/Header";
import Stats from "../components/Stats";
import About from "../components/About";
import Demo from "../components/Demo";
import redisClient from "../lib/redis";

export default function HomePage({ stats }) {
  return (
    <>
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
