import mongoPromise from "../lib/mongo";
import redisClient from "../lib/redis";
import {logger} from "../lib/logger";
import {Container, Notification, Button} from "react-bulma-components";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Activate = ({apiKey, email}) => {
  const getNotification = () => {
    if (email === null) {
      return <Notification color="danger" light={true}>Sorry we could not find your key :-/</Notification>;
    } else {
      return <Notification color="success" light={true}>Your API key <i>{apiKey}</i> is now activated and bound to your
        mail {email}</Notification>;
    }
  }

  return (
    <section className="section">
      <Container>
        {getNotification()}
        <Link href="/" passHref={true}>
          <Button color="light" className="mt-6">
            <a><FontAwesomeIcon icon={faArrowLeft}/> Back to home page</a>
          </Button>
        </Link>
      </Container>
    </section>
  )
}

export async function getServerSideProps(context) {
  const client = await mongoPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  const apiKey = context.query['apiKey'] || null;
  let email = null;

  try {
    email = await redisClient.get(`fc:keyRequest:${apiKey}`);

    if (email !== null) {
      // The 'subscriptions' collection uses the account email for the id!
      const query = {_id: email};
      const set = {apiKey: apiKey, verified: true, limitPerTenSeconds: 10};
      await db.collection('subscriptions').updateOne(query, {$set: set}, {upsert: true});
    }
  } catch (e) {
    logger.error(e);
  }

  return {
    props: {
      apiKey: apiKey,
      email: email
    }
  };
}

export default Activate;
