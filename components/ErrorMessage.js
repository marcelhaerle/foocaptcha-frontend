const ErrorMessage = ({text = "Uups... this should not happen :-/"}) => {
  return (
    <div className="center-horizontally">{text}</div>
  );
};

export default ErrorMessage;
