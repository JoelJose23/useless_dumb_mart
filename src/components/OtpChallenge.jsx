import { useState } from "react";

const methods = [
  {
    name: "Reverse Cipher",
    encode: (value) => value.split("").reverse().join(""),
  },
  {
    name: "Binary",
    encode: (value) =>
      value
        .split("")
        .map((char) =>
          char.charCodeAt(0).toString(2).padStart(8, "0")
        )
        .join(" "),
  },
  {
    name: "Hexadecimal",
    encode: (value) =>
      value
        .split("")
        .map((char) =>
          char.charCodeAt(0).toString(16).padStart(2, "0")
        )
        .join(" "),
  },
  {
    name: "Base64",
    encode: (value) => btoa(value),
  },
  {
    name: "Caesar Digit Shift",
    encode: (value) =>
      value
        .split("")
        .map((digit) => (Number(digit) + 3) % 10)
        .join(""),
  },
];

export default function OtpChallenge({ onSuccess }) {
  const [challenge] = useState(() => {
    // Static OTP for presentation purposes
    const otp = "424242";

    // Encryption method is still randomly selected
    const method =
      methods[Math.floor(Math.random() * methods.length)];

    return {
      otp,
      method,
      encrypted: method.encode(otp),
    };
  });

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);

  const verify = () => {
    if (answer.trim() === challenge.otp) {
      setError("");
      onSuccess();
      return;
    }

    setError(
      "Incorrect. Your financial decision remains unauthenticated."
    );
  };

  return (
    <div className="otp-overlay">
      <div className="otp-card">

        {/* HEADER */}
        <div className="otp-header">
          <span>🔐</span>

          <div>
            <h2>OTP Verification</h2>
            <p>Secure payment verification</p>
          </div>
        </div>

        {/* ENCRYPTED OTP */}
        <div className="encrypted-box">
          <span>Encrypted OTP</span>

          <strong>{challenge.encrypted}</strong>
        </div>

        {/* SECURITY MESSAGE */}
        <p className="otp-instruction">
          For security purposes, your OTP has been encrypted using:
        </p>

        {/* REVEAL BUTTON */}
        <button
          type="button"
          className="reveal-button"
          onClick={() => setRevealed(true)}
        >
          🔓 Reveal
        </button>

        {/* BETRAYAL MESSAGE */}
        {revealed && (
          <div className="reveal-message">
            Ha! You thought we will make it that easy for you. 💀
          </div>
        )}

        {/* ACTUAL ENCRYPTION METHOD */}
        <div className="cipher-name">
          {challenge.method.name}
        </div>

        {/* OTP INPUT */}
        <label>Enter decrypted OTP</label>

        <input
          type="text"
          inputMode="numeric"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError("");
          }}
          placeholder="Enter OTP"
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="otp-error">
            {error}
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          type="button"
          onClick={verify}
        >
          VERIFY OTP
        </button>

        {/* FOOTER */}
        <small>
          Your security is our inconvenience.
        </small>

      </div>
    </div>
  );
}
