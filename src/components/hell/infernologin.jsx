import { motion } from "motion/react"
import {useState, useRef} from 'react';

export function setAccess(playAni) {
  document.cookie = "archiveAccess=true; path=/; max-age=86400";
  window.location.href = "/inferno/home";
}

// login system: press button, animate, gain access cookie
// go to /inferno/home, check for cookie (in inferno layout) 
// if not present, redirect to /inferno/login

export default function Inferno_Login() {

  const icons = [
  "/icons/hand_8B1A10.svg",
  "/icons/fingerprint_8B1A10.svg",
  "/icons/drop_8B1A10.svg",
  "/icons/eye_8B1A10.svg"
];

const HOLD_TIME = 2500;

const [progress, setProgress] = useState([0, 0, 0, 0]);

const timerRef = useRef(null);
const startTimeRef = useRef(null);

const [showWelcome, setShowWelcome] = useState(false);

  const startPress = (index) => {
    startTimeRef.current = Date.now();
    setShowWelcome(false);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const nextProgress = Math.min(elapsed / HOLD_TIME, 1);

      setProgress((prev) => {
        const updated = [...prev];
        updated[index] = nextProgress;
        return updated;
      });

      if (nextProgress >= 1) {
        clearInterval(timerRef.current);

        setProgress((prev) => {
          const updated = [...prev];
          updated[index] = 1;
          return updated;
        });

        setTimeout(() => {
          setShowWelcome(true);
          setAccess('/inferno');
        }, 600);
      }
    }, 16);
  };

  const cancelPress = (index) => {
    clearInterval(timerRef.current);

    setProgress((prev) => {
      const updated = [...prev];
      updated[index] = 0;
      return updated;
    });
  };

  return( <>
    <div className="flex flex-wrap gap-6 justify-center items-center">
      {icons.map((icon, index) => (
        <motion.button
          key={icon}
          onPointerDown={() => startPress(index)}
          onPointerUp={() => cancelPress(index)}
          onPointerLeave={() => cancelPress(index)}
          className="ui-button relative overflow-hidden rounded-lg
                    w-24 h-24 p-2 flex items-center justify-center"
        >
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-red-700/30"
            animate={{ height: `${progress[index] * 100}%`, }}
            transition={{ duration: 0 }}
          />

          <img
            src={icon}
            alt=""
            className="relative z-10 w-20 h-20"
          />
        </motion.button>
      ))}
    </div>
    
    </>)
}