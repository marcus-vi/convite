import { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import Letter from "./components/Letter";
import Invite from "./components/Invite";

export default function App() {
  const [step, setStep] = useState(0);
  const startY = useRef(null);

  const audioRef = useRef(null);

  // 🎵 música global
  useEffect(() => {
    const audio = new Audio("/The Walters -- I Love You So.mp3");
    audio.loop = true;
    audio.volume = 0.1;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Autoplay bloqueado até interação do usuário");
    });
  }, []);

  // 📳 vibração
  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(80);
  };

  // 👆 início do toque
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  // 👇 fim do toque (define direção)
  const handleTouchEnd = (e) => {
    if (startY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY.current;

    // 🔼 swipe pra cima (próximo)
    if (diff < -80) {
      setStep((prev) => {
        const next = Math.min(prev + 1, 2);
        if (next !== prev) vibrate();
        return next;
      });
    }

    // 🔽 swipe pra baixo (voltar)
    if (diff > 80) {
      setStep((prev) => {
        const next = Math.max(prev - 1, 0);
        if (next !== prev) vibrate();
        return next;
      });
    }

    startY.current = null;
  };

  const pages = [
    <Home />,
    <Letter />,
    <Invite />,
  ];

  return (
    <div
      className="h-screen w-screen bg-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {pages[step]}
    </div>
  );
}