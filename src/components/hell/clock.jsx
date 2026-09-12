import { useEffect, useState } from "react";

export default function SystemClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const day = String(now.getDate()).padStart(2, "0");

  const month = now.toLocaleString("en-GB", {
    month: "long"
  });

  const year = now.getFullYear();

  const time =
    `${String(now.getHours()).padStart(2, "0")}:` +
    `${String(now.getMinutes()).padStart(2, "0")}:` +
    `${String(now.getSeconds()).padStart(2, "0")}`;

  return (
    <div>
        <h1 className="text-center text-2xl font-cutiveMono"> <div>{day}.{month}.{year}</div> </h1>
      	<h1 className="text-center text-6xl font-cutiveMono"> <div>{time} </div> </h1>
    </div>
  );
}
