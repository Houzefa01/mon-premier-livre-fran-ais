import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { SYLLABES_NIVEAUX } from "@/lib/data";
import { useSpeech } from "@/hooks/useSpeech";
import { useProgress } from "@/hooks/useProgress";
import { Volume2, ChevronRight } from "lucide-react";

const SyllabesPage = () => {
  const [niveauActif, setNiveauActif] = useState(0);
  const [syllabeActive, setSyllabeActive] = useState<string | null>(null);
  const { parler } = useSpeech();
  const { progression, ajouterSyllabe } = useProgress();

  const niveau = SYLLABES_NIVEAUX[niveauActif];

  const handleSyllabe = (s: string) => {
    setSyllabeActive(s);
    ajouterSyllabe(s);
    parler(s, 0.7);
  };

  return (
    <AppLayout titre="Syllabes">
      <div className="px-4 pt-4">
        {/* Sélecteur de niveau */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {SYLLABES_NIVEAUX.map((n, i) => (
            <button
              key={n.niveau}
              onClick={() => { setNiveauActif(i); setSyllabeActive(null); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                niveauActif === i
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Niveau {n.niveau}
            </button>
          ))}
        </div>

        <h2 className="text-sm font-bold text-muted-foreground mb-3">{niveau.nom}</h2>

        {/* Syllabe active */}
        {syllabeActive && (
          <div className="bg-card rounded-2xl p-6 mb-4 text-center animate-bounce-in border border-border">
            <p className="text-6xl font-black text-secondary mb-3">{syllabeActive}</p>
            <button
              onClick={() => handleSyllabe(syllabeActive)}
              className="bg-secondary text-secondary-foreground rounded-full px-5 py-2 font-bold text-sm flex items-center gap-2 mx-auto active:scale-95 transition-transform"
            >
              <Volume2 className="w-4 h-4" />
              Écouter
            </button>
          </div>
        )}

        {/* Grille des syllabes */}
        <div className="grid grid-cols-5 gap-2">
          {niveau.syllabes.map((s) => {
            const apprise = progression.syllabesApprises.includes(s);
            return (
              <button
                key={s}
                onClick={() => handleSyllabe(s)}
                className={`py-3 rounded-xl font-bold text-lg transition-all active:scale-90 ${
                  syllabeActive === s
                    ? "bg-secondary text-secondary-foreground shadow-lg"
                    : "bg-card text-foreground border border-border"
                }`}
              >
                {s}
                {apprise && <span className="text-[10px] block">⭐</span>}
              </button>
            );
          })}
        </div>

        {/* Navigation niveau suivant */}
        {niveauActif < SYLLABES_NIVEAUX.length - 1 && (
          <button
            onClick={() => { setNiveauActif(niveauActif + 1); setSyllabeActive(null); }}
            className="mt-4 w-full bg-muted text-foreground rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            Niveau suivant <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <p className="text-center text-xs text-muted-foreground mt-4">
          {progression.syllabesApprises.length} syllabes apprises ⭐
        </p>
      </div>
    </AppLayout>
  );
};

export default SyllabesPage;
