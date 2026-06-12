import { useEffect, useState } from "react";

export default function Home({ onNext }) {
  const phrases = [
    "são tantos sentimentos",
    "que nessas palvras eu jamais conseguiria expressar",
    "por isso, digo",
    "te amo ❤️",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [startY, setStartY] = useState(null);
  const [offsetY, setOffsetY] = useState(0);

  // ⏱ typewriter loop infinito (escreve e apaga)
  useEffect(() => {
    const current = phrases[phraseIndex];

    const speed = isDeleting ? 25 : 45;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // ✍️ escrevendo
        setText(current.substring(0, text.length + 1));

        if (text === current) {
          // pausa antes de apagar
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // 🧹 apagando
        setText(current.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  // 📱 swipe start
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  // 📱 swipe move
  const handleTouchMove = (e) => {
    if (!startY) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    setOffsetY(diff);
  };

  // 📱 swipe end
  const handleTouchEnd = () => {
    if (offsetY < -80) {
      if (navigator.vibrate) navigator.vibrate(80);
      onNext();
    }

    setStartY(null);
    setOffsetY(0);
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center text-center text-white relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 🌄 fundo (video) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Design sem nome.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          transform: `scale(1.1) translateY(${offsetY * 0.05}px)`,
          transition: startY ? "none" : "transform 0.4s ease",
        }}
      />

      {/* 🖤 overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* conteúdo */}
      <div
        className="relative z-10 px-6"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      >
        <h1 className="text-2xl font-bold leading-snug">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="mt-4 text-sm text-gray-200">
          Deslize para continuar ↑
        </p>
      </div>
    </div>
  );
}