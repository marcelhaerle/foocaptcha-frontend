import {useEffect, useState, useCallback} from "react";
import { CSpinner } from "@coreui/react";
import Image from "next/image";

export default function Captcha({ type, description }) {

  const [loading, setLoading] = useState(true);
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState('');
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    loadEquationCaptcha();
  }, []);

  const loadEquationCaptcha = async () => {
    setLoading(true);
    setVerified(null);
    setGuess('');
    try {
      const response = await fetch(`/api/${type}`);
      if (response.ok) {
        const json = await response.json();
        setCaptcha(json);
        setError(null);
      } else {
        setError(response.statusText);
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const verify = async () => {
    try {
      const response = await fetch(`/api/verify?guess=${guess}&id=${captcha.id}`);
      if (response.ok) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    } catch (e) {
      setVerified(false);
    }
  }

  const imageHelper = () => {
    if (error) return <div className="center-horizontally">Uups... this should not happen :-/<br/>Sorry!</div>;
    if (loading) return <div className="center-horizontally"><CSpinner /></div>;

    return (
      <figure className="image">
        <Image src={captcha.src}  alt="Equation Captcha"/>
      </figure>
    )
  };

  const verifyHelper = () => {
    if (verified === null) return <span />;
    if (verified) {
      return <span className="has-text-weight-bold has-text-success ml-3 mb-2">Correct</span>;
    } else {
      return <span className="has-text-weight-bold has-text-danger ml-3 mb-2">Nope</span>;
    }
  };

  return (
    <div className="box" style={{width: 300, margin: '10px auto'}}>
      <div style={{height: 100}} className="has-text-centered">
        {imageHelper()}
      </div>
      <div className="field mt-2">
        <label htmlFor="charsGuess" className="label">Your guess:</label>
        <div className="control">
          <input id="charsGuess" type="text" className="input"
                 value={guess}
                 onChange={({target}) => setGuess(target.value)} />
        </div>
      </div>
      <div className="buttons">
        <button className="is-success button" id="verifyCharsButton"
                onClick={() => verify()} disabled={verified !== null}>Verify</button>
        <button className="is-info button" id="reloadCharsButton"
                onClick={() => loadEquationCaptcha()}>Reload</button>
        {verifyHelper()}
      </div>
      <h1 className="has-text-centered title is-4">{description}</h1>
    </div>
  );
}
