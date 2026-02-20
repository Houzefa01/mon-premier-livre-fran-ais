import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { MOTS_LECTURE } from "@/lib/data";
import { useSpeech } from "@/hooks/useSpeech";
import { useProgress } from "@/hooks/useProgress";
import { Volume2, Check, X, ArrowRight } from "lucide-react";

const LecturePage = () => {
  const [indexMot, setIndexMot] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [estCorrect, setEstCorrect] = useState<boolean | null>(null);
  const { parler } = useSpeech();
  const { ajouterMot, ajouterScore } = useProgress();

  const motActuel = MOTS_LECTURE[indexMot];

  // Générer des options (le bon mot + 2 distracteurs)
  const options = useMemo(() => {
    const autres = MOTS_LECTURE.filter((_, i) => i !== indexMot)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((m) => m.mot);
    return [...autres, motActuel.mot].sort(() => Math.random() - 0.5);
  }, [indexMot, motActuel.mot]);

  const handleChoix = (mot: string) => {
    setChoix(mot);
    const correct = mot === motActuel.mot;
    setEstCorrect(correct);
    if (correct) {
      ajouterMot(motActuel.mot);
      ajouterScore("lecture", 1);
      parler(`Bravo ! C'est bien ${motActuel.mot} !`);
    } else {
      parler(`Non, ce n'est pas ${mot}. C'est ${motActuel.mot}.`);
    }
  };

  const motSuivant = () => {
    setChoix(null);
    setEstCorrect(null);
    setIndexMot((prev) => (prev + 1) % MOTS_LECTURE.length);
  };

  return (
    <AppLayout titre="Lecture">
      <div className="px-4 pt-4">
        {/* Image et emoji du mot */}
        <div className="bg-card rounded-2xl p-8 mb-4 text-center border border-border">
          <span className="text-8xl block mb-4 animate-float">{motActuel.image}</span>
          
          {/* Syllabes colorées */}
          <div className="flex justify-center gap-1 mb-3">
            {motActuel.syllabes.map((s, i) => (
              <span
                key={i}
                className={`text-2xl font-black px-2 py-1 rounded-lg ${
                  i % 2 === 0
                    ? "text-primary bg-primary/10"
                    : "text-secondary bg-secondary/10"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          <button
            onClick={() => parler(motActuel.mot)}
            className="bg-fun-purple text-fun-purple-foreground rounded-full px-5 py-2 font-bold text-sm flex items-center gap-2 mx-auto active:scale-95 transition-transform"
          >
            <Volume2 className="w-4 h-4" />
            Écouter le mot
          </button>
        </div>

        {/* Question */}
        <h2 className="text-center font-bold text-foreground mb-3">
          Quel est ce mot ? 🤔
        </h2>

        {/* Options */}
        <div className="space-y-2">
          {options.map((opt) => {
            let classes = "bg-card border border-border text-foreground";
            if (choix) {
              if (opt === motActuel.mot) {
                classes = "bg-accent text-accent-foreground";
              } else if (opt === choix && !estCorrect) {
                classes = "bg-destructive text-destructive-foreground";
              }
            }
            return (
              <button
                key={opt}
                onClick={() => !choix && handleChoix(opt)}
                disabled={!!choix}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${classes}`}
              >
                {opt}
                {choix && opt === motActuel.mot && <Check className="w-5 h-5 inline ml-2" />}
                {choix && opt === choix && !estCorrect && <X className="w-5 h-5 inline ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Feedback + suivant */}
        {choix && (
          <div className="mt-4 animate-slide-up">
            <div
              className={`text-center p-3 rounded-xl font-bold mb-3 ${
                estCorrect
                  ? "bg-accent/20 text-accent"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {estCorrect ? "🎉 Bravo !" : `Le mot était « ${motActuel.mot} »`}
            </div>
            <button
              onClick={motSuivant}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              Mot suivant <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-4">
          Mot {indexMot + 1} / {MOTS_LECTURE.length}
        </p>
      </div>
    </AppLayout>
  );
};

export default LecturePage;
