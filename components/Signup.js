import {useState} from "react";
import {Box, Button, Columns, Container, Form, Message, Notification} from "react-bulma-components";
import InlineCaptcha from "./InlineCaptcha";
import {validate} from "email-validator";

const Signup = () => {

  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [id, setId] = useState('');
  const [solution, setSolution] = useState('');
  const [reload, setReload] = useState(false);

  const emailInputColor = () => {
    if (email === '' || validate(email)) {
      return 'text';
    } else {
      return 'danger';
    }
  }

  const handleSubmit = () => {
    if (registered) {
      return;
    }
    const body = JSON.stringify({
      email,
      id,
      solution
    });
    fetch('/api/signup', {method: 'POST', body: body})
      .then(response => {
        if (response.ok) {
          setRegistered(true);
        } else {
          setReload(true);
          setReload(false);
          setSolution('');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <section className="section">
      <Container>
        <h2 className="subtitle is-size-3 mb-5">Get your personal API key</h2>
        <p className="mb-5">
          The API is protected by an API key. This key is used to rate limit the captcha creation usage.
          Every key can generate 10 captchas per 10 seconds. You can register for a key by sending us your email
          address. You will receive a link where you can activate the key. Every key is bound to one email address.
          This means you cannot register two keys with one email address. When you register the email address twice,
          the former key will be deactivated. The registration is free of charge.
        </p>
        {registered &&
          <Message color="success" light={true}>
            <Message.Header>Your API key is ready</Message.Header>
            <Message.Body>
              Watch your inbox for the activation link!
            </Message.Body>
          </Message>}
        <Box>
          <Columns vCentered={true} centered={true} breakpoint="desktop">
            <Columns.Column>
              <InlineCaptcha type="equation" setId={setId} reload={reload}/>
            </Columns.Column>
            <Columns.Column>
              <Form.Field>
                <Form.Control>
                  <Form.Input
                    placeholder="x = ?"
                    value={solution}
                    onChange={({target}) => setSolution(target.value)}
                    required/>
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            <Columns.Column>
              <Form.Field>
                <Form.Control>
                  <Form.Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                    color={emailInputColor()}
                    required/>
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            <Columns.Column>
              <Form.Field>
                <Form.Control>
                  {solution !== '' && validate(email) &&
                    <Button color="success" onClick={handleSubmit}>Create my API key</Button>}
                </Form.Control>
              </Form.Field>
            </Columns.Column>
          </Columns>
        </Box>
        <Notification color="info" light={true}>
          <h5>We promise!</h5>
          We will never give your email to any 3rd party. And we won&apos;t send you any spam!
        </Notification>
      </Container>
    </section>
  );
}

export default Signup;
