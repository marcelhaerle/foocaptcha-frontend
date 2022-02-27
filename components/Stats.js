import Counter from "./Counter";

export default function Stats({ stats }) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <Counter text={"Total captchas created"} type={"primary"} count={stats.totalCaptchas} />
          </div>
          <div className="column">
            <Counter text={"Total captchas viewed"} type={"info"} count={stats.totalViewed} />
          </div>
          <div className="column">
            <Counter text={"Total captchas verified"} type={"success"} count={stats.totalVerified} />
          </div>
        </div>
      </div>
    </section>
  )
}
