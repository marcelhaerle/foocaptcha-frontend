import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

const Spinner = ({size = '1x', spin = true}) => {
  return (
    <div className="center-horizontally">
      <FontAwesomeIcon icon={faRotate} size={size} spin={spin}/>
    </div>
  )
}

export default Spinner;
