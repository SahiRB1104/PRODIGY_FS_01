import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "../context/ThemeContext";

export default function ParticlesBackground() {
  const { darkMode } = useTheme(); // 🔄 Real dark mode state

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          color: {
            value: darkMode ? "#ffffff" : "#000000",
          },
          links: {
            color: darkMode ? "#ffffff" : "#000000",
            enable: true,
            distance: 120,
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 1.5,
          },
          number: {
            value: 50,
          },
          size: {
            value: 2,
          },
        },
      }}
    />
  );
}
