import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ALPHABET } from "@/lib/data";
import { useSpeech } from "@/hooks/useSpeech";
import { useProgress } from "@/hooks/useProgress";
import { Volume2 } from "lucide-react";

const AlphabetPage = () => {
  const [lettreActive, setLettreActive] = useState<string | null>(null);
  const { parler } = useSpeech();
  const { progression, ajouterLettre } = useProgress();

  const handleLettre = (l: typeof ALPHABET[0]) => {
    setLettreActive(l.lettre);
    ajouterLettre(l.lettre);
    parler(`${l.majuscule}. ${l.majuscule} comme ${l.motExemple}`);
  };

  const lettreSelectionnee = ALPHABET.find((l) => l.lettre === lettreActive);

  return (
    <AppLayout titre="Alphabet">
      <div className="px-4 pt-4">
        {/* Zone d'affichage de la lettre active */}
        {lettreSelectionnee ? (
          <div className="bg-card rounded-2xl p-6 mb-4 text-center animate-bounce-in border border-border">
            <div className="text-7xl font-black text-primary mb-2">
              {lettreSelectionnee.majuscule}{lettreSelectionnee.lettre}
            </div>
            <div className="text-4xl mb-2">{lettreSelectionnee.emoji}</div>
            <p className="text-lg font-bold text-foreground">
              {lettreSelectionnee.majuscule} comme{" "}
              <span className="text-primary">{lettreSelectionnee.motExemple}</span>
            </p>
            <button
              onClick={() => handleLettre(lettreSelectionnee)}
              className="mt-3 bg-primary text-primary-foreground rounded-full px-5 py-2 font-bold text-sm flex items-center gap-2 mx-auto active:scale-95 transition-transform"
            >
              <Volume2 className="w-4 h-4" />
              Écouter
            </button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-6 mb-4 text-center border border-border">
            <p className="text-5xl mb-2 animate-float">🔤</p>
            <p className="text-foreground font-bold">Appuie sur une lettre !</p>
          </div>
        )}

        {/* Grille des lettres */}
        <div className="grid grid-cols-6 gap-2">
          {ALPHABET.map((l) => {
            const apprise = progression.lettresApprises.includes(l.lettre);
            return (
              <button
                key={l.lettre}
                onClick={() => handleLettre(l)}
                className={`relative aspect-square rounded-xl font-black text-xl flex items-center justify-center transition-all active:scale-90 ${
                  lettreActive === l.lettre
                    ? `${l.couleur} text-card shadow-lg scale-110`
                    : "bg-card text-foreground border border-border"
                }`}
              >
                {l.majuscule}
                {apprise && (
                  <span className="absolute -top-1 -right-1 text-xs">⭐</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {progression.lettresApprises.length} / 26 lettres découvertes ⭐
        </p>
      </div>
    </AppLayout>
  );
};

export default AlphabetPage;
