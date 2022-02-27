import CountUp from "react-countup";

export default function Counter(props) {
  return (
    <div className={`box has-background-${props.type} has-text-light`}>
      <p className="is-size-4 has-text-weight-bold">{props.text}</p>
      <p className="is-size-1 has-text-weight-bold has-text-centered">
        <CountUp end={props.count} duration={3}/>
      </p>
    </div>
  )
};
