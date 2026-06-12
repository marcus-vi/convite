import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaSpa } from "react-icons/fa";

export default function LetterSection() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);

  const [flowers, setFlowers] = useState([]);

  // 🌸 geração de flores
  useEffect(() => {
    const interval = setInterval(() => {
      const newFlower = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: Math.random() * 5 + 6,
        drift: (Math.random() - 0.5) * 60,
      };

      setFlowers((prev) => [...prev, newFlower].slice(-6)); // mais elegante com menos flores
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-neutral-400 px-4">

      {/* 🌿 fundo raízes */}
      <div className="absolute inset-0 opacity-10 root-bg" />

      {/* 🌫 glow vermelho suave */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[140px]" />

      {/* 🌸 FLORES FLUTUANTES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {flowers.map((f) => (
          <div
            key={f.id}
            className="flower-float text-red-500"
            style={{
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              "--drift": `${f.drift}px`,
              "--duration": `${f.duration}s`,
            }}
          >
            <FaSpa />
          </div>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-20 flex flex-col items-center justify-center">

        {/* 💌 CARTA */}
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.3 }}
          animate={{
            y: open ? -40 : 120,
            opacity: open ? 1 : 0,
            scale: open ? 1 : 0.3,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex w-auto flex-col rounded-2xl bg-[#f5ead7] p-6 text-black shadow-[0_20px_80px_rgba(0,0,0,0.10)] md:p-10"
        >

          {/* topo */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold md:text-3xl text-neutral-800">
              Para meu docinho ❤️
            </h2>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom(!zoom);
              }}
              className="rounded-full bg-black/5 p-3 transition hover:scale-110 hover:bg-black/10"
            >
              <Search size={20} />
            </button>
          </div>

          {/* texto */}
          <div
            className={`overflow-y-auto pr-3 text-neutral-700 transition-all duration-300 ${zoom
              ? "text-lg md:text-3xl leading-10"
              : "text-sm md:text-lg leading-7 md:leading-9"
              }`}
          >
            Fiquei horas pensando no que escrever em meio a todo o caos desses últimos dias, e acabei percebendo que só uma coisa passou pela minha cabeça durante todo esse tempo...
              <br /> 
            <p className="text-red-600">Eu te amo. Te amo do fundo do meu coração.</p>
            Independentemente de qualquer coisa, esse sentimento nunca deixou de existir nem por um segundo.

          </div>
        </motion.div>

        {/* 💬 mensagem após abrir */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 flex justify-center"
          >
            <p className="rounded-full bg-black/5 px-6 py-3 text-center text-sm font-medium text-neutral-600 backdrop-blur-sm md:text-base">
              Agora desce para continuar ✨
            </p>
          </motion.div>
        )}

        {/* 💌 ENVELOPE */}
        {!open && (
          <motion.div
            onClick={() => setOpen(true)}
            onHoverStart={() => setHoverOpen(true)}
            onHoverEnd={() => setHoverOpen(false)}
            animate={{
              y: hoverOpen ? -18 : 0,
              scale: open ? 0.9 : 1,
              opacity: open ? 0 : 1,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >

            {/* envelope */}
            <div className="relative h-[240px] w-[340px] overflow-hidden rounded-sm bg-[#8B6B4A] shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

              {/* tampa */}
              <div
                className="h-full w-full bg-[#A67C52]"
                style={{
                  clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                }}
              />

              {/* laterais */}
              <div
                className="absolute bottom-0 left-0 z-20 h-full w-1/2 bg-[#9C734B]"
                style={{
                  clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 z-20 h-full w-1/2 bg-[#7A5A3A]"
                style={{
                  clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              {/* base */}
              <div
                className="absolute bottom-0 left-0 z-10 h-[55%] w-full bg-[#6B4F34]"
                style={{
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                }}
              />

              {/* coração */}
              <div className="fill-current text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.25)]">
                <svg
                  width="55"
                  height="55"
                  viewBox="0 0 60 60"
                  className="fill-current text-red-500"
                >
                  <path d="M30 55c-8-6-15-12-15-21 0-7 5-12 10-12 3 0 5 1 7 3 2-2 4-3 7-3 5 0 10 5 10 12 0 9-7 15-15 21z" />
                </svg>
              </div>
            </div>

            <p
              className={`mt-4 text-center text-sm transition-colors ${hoverOpen ? "text-red-400" : "text-neutral-800"
                }`}
            >
              clique para abrir a carta
            </p>

          </motion.div>
        )}
      </div>
    </section>
  );
}