export default function About() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="is-size-2 mb-4">Yes another Captcha service!</h2>
        <p className="block is-size-5">
          Do we need another one? Probably not, but we wanted to have our own that is open-source, free of charge and
          easy to use. And you are very welcome to use foocaptcha for your sites and applications too! Please help
          us to improve and maintain the <a href="https://github.com/marcelhaerle/foocaptcha" target="_blank">code
          base</a> or documentation. Everybody is welcome!
        </p>
        <p className="block is-size-5">
          foocaptcha provides a very simple API (<i>documentation will follow soon</i>) that generates images,
          containing a
          challenge that a human should be able to solve with ease, but a robot should not be able to recognize.
          You can use this images to protect web form for registration or login to be missed by machines.
        </p>
      </div>
    </section>
  )
}
