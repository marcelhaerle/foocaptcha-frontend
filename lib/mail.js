import {SMTPClient} from "emailjs";
import {logger} from "./logger";

const client = new SMTPClient({
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: true
});

/**
 * Send email.
 * @param text {String} the text
 * @param subject {String} the subject
 * @param to {String} the recipient (mail to)
 */
export function send(text, subject, to) {
  client.send({
    text,
    from: process.env.SMTP_FROM,
    to,
    subject
  }, (err, message) => {
    if (err) {
      logger.warn("Failed to send mail", {err: err.message});
    } else {
      logger.info("Send mail to", {to: message.header.to});
    }
  })
}
