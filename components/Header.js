import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <section className="hero is-info is-medium">
      <div className="hero-body has-text-centered">
        <h1 className="title is-1 mb-6">foocaptcha</h1>
        <h2 className="subtitle is-2">Keep the <FontAwesomeIcon icon={faRobot}/> away :-)</h2>
      </div>
    </section>
  )
}
