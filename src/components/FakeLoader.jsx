import { useEffect, useState } from "react";

const defaultMessages = [
  "Initializing shopping experience...",
  "Contacting product database...",
  "Calculating optimal shopping trajectory...",
  "Consulting our extremely qualified algorithms...",
  "Checking if you are a real human...",
  "Optimizing your purchase...",
  "Almost there...",
];

export default function FakeLoader({
  duration = 5000,
  messages = defaultMessages,
  onComplete,
}) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(messages[0]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let currentCycle = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let percentage = (elapsed / duration) * 100;

      // Hit 99%, then restart from 1%
      if (percentage >= 99) {
        if (currentCycle < 2) {
          currentCycle++;
          setCycle(currentCycle);

          startTime = Date.now();
          setProgress(1);
          setMessage("Wait... something went wrong.");

          return;
        }

        // Third run completes normally
        percentage = 100;
      }

      setProgress(percentage);

      const messageIndex = Math.min(
        Math.floor((percentage / 100) * messages.length),
        messages.length - 1
      );

      setMessage(messages[messageIndex]);

      if (percentage >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, messages, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-6 text-white">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">
            UselessMart™
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {message}
          </p>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>{Math.floor(progress)}%</span>
          <span>
            Attempt {Math.min(cycle + 1, 3)} of 3
          </span>
        </div>
      </div>
    </div>
  );
}
