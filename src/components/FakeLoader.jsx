import { useEffect, useState, useRef } from "react";

export default function FakeLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      // Painfully slow and completely unnecessary.
      value += Math.random() * 2;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setProgress(100);

        setTimeout(() => {
          onCompleteRef.current?.();
        }, 700);
      } else {
        setProgress(value);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fake-loader-screen">
      <div className="fake-loader-bar">
        <div
          className="fake-loader-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
