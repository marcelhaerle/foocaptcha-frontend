import Stats from "../components/Stats";
import About from "../components/About";
import Demo from "../components/Demo";
import Signup from "../components/Signup";
import redisClient from "../lib/redis";
import {logger} from "../lib/logger";

export default function HomePage({stats}) {
  return (
    <>
      <Stats stats={stats}/>
      <About/>
      <Demo/>
      <Signup/>
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
