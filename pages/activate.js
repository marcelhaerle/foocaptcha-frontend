import {Button, Container, Notification} from "react-bulma-components";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const Activate = ({apiKey}) => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetch(`/api/activate?apiKey=${apiKey}`)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            setLoading(false);
            setEmail(json.email);
          })
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false)
        setError(e.message);
      })
  }, [])

  const getNotification = () => {
    if (loading) return <div className="has-text-centered"><Spinner size="3x"/></div>;
    if (error) return <ErrorMessage/>;

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
  const apiKey = context.query['apiKey'] || null;
  return {
    props: {
      apiKey
    }
  };
}

export default Activate;
