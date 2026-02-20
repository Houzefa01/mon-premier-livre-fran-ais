import { useState, useCallback, useEffect } from "react";

export interface Progression {
  lettresApprises: string[];
  syllabesApprises: string[];
  motsLus: string[];
  scores: { module: string; score: number; date: string }[];
  tempsTotal: number; // en secondes
}

const CLE_STOCKAGE = "liremalin_progression";

const progressionVide: Progression = {
  lettresApprises: [],
  syllabesApprises: [],
  motsLus: [],
  scores: [],
  tempsTotal: 0,
};

export const useProgress = () => {
  const [progression, setProgression] = useState<Progression>(() => {
    try {
      const donnees = localStorage.getItem(CLE_STOCKAGE);
      return donnees ? JSON.parse(donnees) : progressionVide;
    } catch {
      return progressionVide;
    }
  });

  useEffect(() => {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(progression));
  }, [progression]);

  const ajouterLettre = useCallback((lettre: string) => {
    setProgression((prev) => ({
      ...prev,
      lettresApprises: [...new Set([...prev.lettresApprises, lettre])],
    }));
  }, []);

  const ajouterSyllabe = useCallback((syllabe: string) => {
    setProgression((prev) => ({
      ...prev,
      syllabesApprises: [...new Set([...prev.syllabesApprises, syllabe])],
    }));
  }, []);

  const ajouterMot = useCallback((mot: string) => {
    setProgression((prev) => ({
      ...prev,
      motsLus: [...new Set([...prev.motsLus, mot])],
    }));
  }, []);

  const ajouterScore = useCallback((module: string, score: number) => {
    setProgression((prev) => ({
      ...prev,
      scores: [...prev.scores, { module, score, date: new Date().toISOString() }],
    }));
  }, []);

  const reinitialiser = useCallback(() => {
    setProgression(progressionVide);
  }, []);

  return {
    progression,
    ajouterLettre,
    ajouterSyllabe,
    ajouterMot,
    ajouterScore,
    reinitialiser,
  };
};
