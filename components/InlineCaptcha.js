import {useEffect, useState} from "react";
import Image from "next/image";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import {loadCaptcha} from "../lib/api-helper";

export default function InlineCaptcha({type, setId, reload}) {

  const [loading, setLoading] = useState(true);
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState(null);

  let timerId;

  useEffect(() => {
    load();
    return () => {
      clearTimeout(timerId);
    }
  }, []);

  useEffect(() => {
    if (reload) {
      load();
    }
  }, [reload]);

  const load = () => {
    clearTimeout(timerId);

    setLoading(true);
    loadCaptcha(type)
      .then(res => {
        setCaptcha(res);
        setId(res.id);
        setLoading(false);
        timerId = setTimeout(load, 300000);
      })
      .catch(e => {
      setError(e.message);
        setLoading(false);
    });
  };

  const getImage = () => {
    if (error) return <ErrorMessage/>;
    if (loading) return <Spinner size="2x"/>;

    return <Image src={captcha.src}
                  title="Click to get another"
                  alt="Equation Captcha"
                  width={300} height={100}
                  onClick={() => load()}/>
  };

  return (
    <div style={{height: 100}} className="has-text-centered">
      {getImage()}
    </div>
  );
}
