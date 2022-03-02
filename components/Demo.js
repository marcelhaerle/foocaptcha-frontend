import Captcha from './Captcha';

export default function Demo() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="is-size-3 mb-6">Demo</h2>
        <div className="columns has-text-centered">
          <div className="column">
            <Captcha type={"chars"} description={"Classic"} />
          </div>
          <div className="column">
            <Captcha type={"equation"} description={"Equation"} />
          </div>
        </div>
      </div>
    </section>
  );
}
