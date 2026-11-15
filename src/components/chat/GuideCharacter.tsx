import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  useRive,
  useViewModelInstanceEnum,
  useViewModelInstanceTrigger,
} from "@rive-app/react-webgl2";

export type GuideCharacterState = "idle" | "thinking" | "speaking";

interface GuideCharacterProps {
  state: GuideCharacterState;
  className?: string;
}

const headMotion = {
  idle: {
    rotate: [0, 1.5, 0, -1.5, 0],
    y: [0, -1, 0, -1, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
  thinking: {
    rotate: [0, -10, -7, -10, 0],
    transition: { duration: 1.25, repeat: Infinity, ease: "easeInOut" as const },
  },
  speaking: {
    rotate: [0, 2, -2, 1, 0],
    y: [0, -1, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const bodyMotion = {
  idle: {
    y: [0, -1.5, 0],
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  thinking: {
    y: [0, -1, 0],
    transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
  },
  speaking: {
    y: [0, -2, 0],
    transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const leftArmMotion = {
  idle: { rotate: [0, -3, 0], transition: { duration: 2.4, repeat: Infinity } },
  thinking: { rotate: [0, -7, 0], transition: { duration: 1, repeat: Infinity } },
  speaking: { rotate: [0, -22, 2, -18, 0], transition: { duration: 0.85, repeat: Infinity } },
};

const rightArmMotion = {
  idle: { rotate: [0, 3, 0], transition: { duration: 2.4, repeat: Infinity } },
  thinking: { rotate: [0, 8, 0], transition: { duration: 1, repeat: Infinity } },
  speaking: { rotate: [0, 24, -2, 18, 0], transition: { duration: 0.85, repeat: Infinity } },
  wave: {
    rotate: [0, -78, -42, -78, -42, 0],
    transition: { duration: 1.25, times: [0, 0.18, 0.38, 0.58, 0.78, 1], ease: "easeInOut" as const },
  },
};

const stateLabels: Record<GuideCharacterState, string> = {
  idle: "Ready to chat",
  thinking: "Thinking about your question",
  speaking: "Sharing an answer",
};

export default function GuideCharacter({ state, className = "" }: GuideCharacterProps) {
  const riveSource = import.meta.env.VITE_RIVE_GUIDE_SRC || "/testr.riv";
  const [riveFailed, setRiveFailed] = useState(false);

  if (riveSource && !riveFailed) {
    return (
      <RiveGuideCharacter
        src={riveSource}
        state={state}
        className={className}
        onLoadError={() => setRiveFailed(true)}
      />
    );
  }

  return <SvgGuideCharacter state={state} className={className} />;
}

const RIVE_STATE_MACHINE =
  import.meta.env.VITE_RIVE_GUIDE_STATE_MACHINE || "State Machine 1";
const RIVE_STATUS_PROPERTY = "status";
const RIVE_WAVE_TRIGGER = "wave";

interface RiveGuideCharacterProps extends GuideCharacterProps {
  src: string;
  onLoadError: () => void;
}

function RiveGuideCharacter({
  src,
  state,
  className = "",
  onLoadError,
}: RiveGuideCharacterProps) {
  const hasPlayedWelcomeWave = useRef(false);
  const { rive, RiveComponent } = useRive({
    src,
    stateMachine: RIVE_STATE_MACHINE,
    autoplay: true,
    autoBind: true,
    onLoadError,
  });
  const viewModelInstance = rive?.viewModelInstance;
  const { setValue: setStatus } = useViewModelInstanceEnum(
    RIVE_STATUS_PROPERTY,
    viewModelInstance,
  );
  const { trigger: playWave } = useViewModelInstanceTrigger(
    RIVE_WAVE_TRIGGER,
    viewModelInstance,
  );

  useEffect(() => {
    if (viewModelInstance) setStatus(state);
  }, [setStatus, state, viewModelInstance]);

  useEffect(() => {
    if (rive && viewModelInstance && !hasPlayedWelcomeWave.current) {
      playWave();
      hasPlayedWelcomeWave.current = true;
    }
  }, [playWave, rive, viewModelInstance]);

  return (
    <RiveComponent
      className={className}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      role="img"
      aria-label={`Portfolio guide: ${stateLabels[state]}`}
    />
  );
}

function SvgGuideCharacter({ state, className = "" }: GuideCharacterProps) {
  const [arrivalWave, setArrivalWave] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setArrivalWave(false), 1_250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      role="img"
      aria-label={`Portfolio guide: ${stateLabels[state]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g animate={state} variants={bodyMotion}>
        {/* Compact body and shoulders */}
        <path d="M28 88c1-13 8-21 20-21s19 8 20 21" fill="#5b5bd6" />
        <path d="M39 71h18l5 17H34z" fill="#7778ec" />
        <circle cx="48" cy="59" r="4" fill="#f5b9a8" />

        <motion.g
          animate={state}
          variants={leftArmMotion}
          style={{ transformOrigin: "33px 73px" }}
        >
          <path d="M32 73c-6 1-9 6-10 12" fill="none" stroke="#f2b19e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="21" cy="86" r="4" fill="#ffd3bd" />
        </motion.g>
        <motion.g
          animate={arrivalWave ? "wave" : state}
          variants={rightArmMotion}
          style={{ transformOrigin: "63px 73px" }}
        >
          <path d="M64 73c6 1 9 6 10 12" fill="none" stroke="#f2b19e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="75" cy="86" r="4" fill="#ffd3bd" />
        </motion.g>

        {/* Head tilt is the thinking cue; the face stays crisp at small sizes. */}
        <motion.g
          animate={state}
          variants={headMotion}
          style={{ transformOrigin: "48px 42px" }}
        >
          <path d="M46 24V17" stroke="#7778ec" strokeWidth="4" strokeLinecap="round" />
          <motion.circle
            cx="48"
            cy="14"
            r="4"
            fill="#42c6ad"
            animate={state === "thinking" ? { scale: [1, 1.22, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, repeat: state === "thinking" ? Infinity : 0 }}
          />
          <rect x="23" y="24" width="50" height="42" rx="18" fill="#ffd3bd" />
          <path d="M24 43c0-15 8-23 24-23 11 0 19 6 22 15-7-3-13-7-17-12-5 8-15 13-29 14z" fill="#34366f" />
          <path d="M30 42c2-2 5-2 7 0M59 42c2-2 5-2 7 0" fill="none" stroke="#34366f" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="35" cy="47" r="2" fill="#34366f" />
          <circle cx="62" cy="47" r="2" fill="#34366f" />
          <circle cx="29" cy="51" r="3" fill="#f5a99d" opacity=".7" />
          <circle cx="68" cy="51" r="3" fill="#f5a99d" opacity=".7" />
          <motion.path
            d="M43 55q5 5 10 0"
            fill="none"
            stroke="#a34f64"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={state === "speaking" ? { d: ["M43 55q5 5 10 0", "M43 54q5 9 10 0", "M43 55q5 5 10 0"] } : { d: "M43 55q5 5 10 0" }}
            transition={{ duration: 0.38, repeat: state === "speaking" ? Infinity : 0 }}
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}
