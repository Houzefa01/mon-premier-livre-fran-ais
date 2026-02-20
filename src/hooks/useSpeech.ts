import { useCallback, useRef } from "react";

/** Hook pour la synthèse vocale en français */
export const useSpeech = () => {
  const synthRef = useRef(window.speechSynthesis);

  const parler = useCallback((texte: string, vitesse: number = 0.8) => {
    // Annuler toute parole en cours
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(texte);
    utterance.lang = "fr-FR";
    utterance.rate = vitesse;
    utterance.pitch = 1.1;

    // Essayer de trouver une voix française
    const voix = synthRef.current.getVoices();
    const voixFR = voix.find(
      (v) => v.lang.startsWith("fr") && v.name.toLowerCase().includes("female")
    ) || voix.find((v) => v.lang.startsWith("fr"));
    
    if (voixFR) {
      utterance.voice = voixFR;
    }

    synthRef.current.speak(utterance);
  }, []);

  const arreter = useCallback(() => {
    synthRef.current.cancel();
  }, []);

  return { parler, arreter };
};
