import Header from "../components/Header";
import Stats from "../components/Stats";
import About from "../components/About";
import Demo from "../components/Demo";
import redisClient from "../lib/redis";
import {logger} from "../lib/logger";

export default function HomePage({stats}) {
  return (
    <>
      <Header/>
      <Stats stats={stats}/>
      <About/>
      <Demo/>
    </>
  )
}

export async function getServerSideProps(context) {
  let totalCaptchas = 0;
  let totalViewed = 0;
  let totalVerified = 0;

  try {
    totalCaptchas = await redisClient.get('fc:totalCaptchas');
    totalViewed = await redisClient.get('fc:totalViewed');
    totalVerified = await redisClient.get('fc:totalVerified');
  } catch (e) {
    logger.error(e);
  }

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
