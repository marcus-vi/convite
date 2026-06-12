import { useState } from "react";
import { motion } from "framer-motion";
const couple = "/WhatsApp%20Image%202026-06-12%20at%2001.29.54.jpeg";

export default function Invite() {
  const [accepted, setAccepted] = useState(false);

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  const moveNoButton = () => {
    setNoPosition({
      x: Math.random() * 250 - 125,
      y: Math.random() * 150 - 75,
    });
  };

  if (accepted) {
    return (
      <section className="flex h-screen items-center justify-center bg-[#02082d] px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-pink-400">
            ❤️ Perfeito ❤️
          </h1>

          <p className="mt-6 text-xl text-white">
            Te busco às 19h 🍕
          </p>

          <p className="mt-2 text-white/80">
            Roger's Pizza
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#02124f] via-[#042f7c] to-[#02082d]">
      {/* REFLEXO LUA */}
      <div className="absolute right-0 top-48 h-40 w-full bg-gradient-to-b from-cyan-400/10 to-transparent" />

      <div className="absolute top-0 left-0 w-full">
        <div className="h-[4px] w-full bg-black/40" />

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${5 + i * 13}%`,
            }}
          >
            <div className="h-10 w-[2px] bg-black/40" />

            <div className="h-5 w-5 rounded-full bg-yellow-200 shadow-[0_0_25px_rgba(255,255,180,1)]" />
          </div>
        ))}
      </div>

      {/* FOTO CASAL */}
      <div className="absolute top-22 flex w-full justify-center">
        <img
          src={couple}
          alt="Nós dois"
          className="
            h-36
            w-36
            rounded-full
            border-4
            border-white
            object-cover
            shadow-[0_0_35px_rgba(255,255,255,0.4)]
          "
        />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-20 mt-40 flex max-w-md flex-col items-center px-6">

        <p className="mb-6 text-center text-2xl italic text-white">
          Com esse seu sorriso,
          <br />
          é impossível essa noite
          <br />
          não ser perfeita.
        </p>

        <h1
          className="
          text-center
          text-5xl
          font-bold
          italic
          text-white
          drop-shadow-lg
        "
        >
          Quer sair comigo?
        </h1>

        <p className="mt-2 text-center text-xl italic text-white/90">
          Você terá uma noite inesquecível.
        </p>

        {/* CARD */}
        <div
          className="
          mt-8
          w-full
          rounded-3xl
          bg-white/10
          p-6
          text-center
          backdrop-blur-md
          border
          border-white/20
        "
        >
          <h2 className="text-2xl font-bold text-white">
            🍕 Roger's Pizza
          </h2>

          <p className="mt-4 text-white/90">
            Av. Carlos Edmundo Landaeta, 627
            <br />
            Cidade Nova
            <br />
            Santana do Paraíso - MG
          </p>

          <p className="mt-4 text-3xl font-bold text-yellow-300">
            19:00
          </p>
        </div>

        {/* BOTÕES */}
        <div className="relative mt-10 flex items-center gap-6">

          <button
            onClick={() => setAccepted(true)}
            className="
              rounded-2xl
              bg-pink-500
              px-8
              py-3
              font-bold
              text-white
              shadow-lg
              transition
              hover:scale-105
            "
          >
            Sim
          </button>

          <motion.button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="
              rounded-2xl
              bg-red-500
              px-8
              py-3
              font-bold
              text-white
              shadow-lg
            "
          >
            Não
          </motion.button>

        </div>

      </div>
    </section>
  );
}