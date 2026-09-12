export default function Inferno_Login() {

  // animate buttons
  const HOLD_TIME = 2500;
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const startPress = () => {
    startTimeRef.current = Date.now();
    setShowWelcome(false);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const nextProgress = Math.min(elapsed / HOLD_TIME, 1);
      setProgress(nextProgress);
      if (nextProgress >= 1) {
        clearInterval(timerRef.current);
        setProgress(1); // Force the visual state to 100%
        setTimeout(() => {
          setShowWelcome(true);
          setAccess('/inferno');
        }, 1000);
      }
    }, 16);
  };

  const cancelPress = () => {
    clearInterval(timerRef.current);
    setProgress(0);
  };

  eturn (
    <>

       <motion.button
          onPointerDown={startPress}
          onPointerUp={cancelPress}
          onPointerLeave={cancelPress}
          className="ui-button relative overflow-hidden rounded-lg
          w-24 h-24 p-2 flex items-center justify-center">
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-red-700/30"
            animate={{ height: `${progress * 100}%`, }}
            transition={{ duration: 0 }}/>
            <img
              src="/icons/hand_8B1A10.svg" alt=""
              className="relative z-10 w-20 h-20"/>
        </motion.button>
    </>
  );
}