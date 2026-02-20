import AppLayout from "@/components/AppLayout";
import { useProgress } from "@/hooks/useProgress";
import { ALPHABET, SYLLABES_NIVEAUX, MOTS_LECTURE } from "@/lib/data";
import { RotateCcw } from "lucide-react";

const ParentDashboard = () => {
  const { progression, reinitialiser } = useProgress();

  const totalSyllabes = SYLLABES_NIVEAUX.reduce((a, n) => a + n.syllabes.length, 0);
  const scoresLecture = progression.scores.filter((s) => s.module === "lecture");
  const scoreMoyen =
    scoresLecture.length > 0
      ? Math.round(
          (scoresLecture.filter((s) => s.score > 0).length / scoresLecture.length) * 100
        )
      : 0;

  const stats = [
    {
      label: "Lettres",
      valeur: `${progression.lettresApprises.length}/${ALPHABET.length}`,
      pourcent: Math.round((progression.lettresApprises.length / ALPHABET.length) * 100),
      couleur: "bg-primary",
    },
    {
      label: "Syllabes",
      valeur: `${progression.syllabesApprises.length}/${totalSyllabes}`,
      pourcent: Math.round((progression.syllabesApprises.length / totalSyllabes) * 100),
      couleur: "bg-secondary",
    },
    {
      label: "Mots lus",
      valeur: `${progression.motsLus.length}/${MOTS_LECTURE.length}`,
      pourcent: Math.round((progression.motsLus.length / MOTS_LECTURE.length) * 100),
      couleur: "bg-fun-purple",
    },
    {
      label: "Score lecture",
      valeur: `${scoreMoyen}%`,
      pourcent: scoreMoyen,
      couleur: "bg-accent",
    },
  ];

  return (
    <AppLayout titre="Espace Parent">
      <div className="px-4 pt-4">
        <div className="bg-card rounded-2xl p-5 mb-4 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-1">📊 Progression</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Suivi des activités de votre enfant
          </p>

          <div className="space-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-foreground">{s.label}</span>
                  <span className="text-muted-foreground">{s.valeur}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.couleur} rounded-full transition-all duration-500`}
                    style={{ width: `${s.pourcent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historique récent */}
        <div className="bg-card rounded-2xl p-5 mb-4 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">🕐 Activité récente</h2>
          {progression.scores.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucune activité pour le moment. Encouragez votre enfant à commencer !
            </p>
          ) : (
            <div className="space-y-2">
              {progression.scores
                .slice(-10)
                .reverse()
                .map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-semibold text-foreground capitalize">
                      {s.module}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          s.score > 0
                            ? "bg-accent/20 text-accent"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {s.score > 0 ? "✓ Réussi" : "✗ À revoir"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(s.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Réinitialiser */}
        <button
          onClick={() => {
            if (confirm("Voulez-vous vraiment réinitialiser toute la progression ?")) {
              reinitialiser();
            }
          }}
          className="w-full bg-destructive/10 text-destructive rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          Réinitialiser la progression
        </button>
      </div>
    </AppLayout>
  );
};

export default ParentDashboard;
