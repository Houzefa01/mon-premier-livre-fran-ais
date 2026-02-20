import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import heroImage from "@/assets/hero-children.png";

const modulesList = [
  {
    titre: "Alphabet",
    description: "Apprends les lettres",
    emoji: "🔤",
    couleur: "bg-primary",
    lien: "/alphabet",
  },
  {
    titre: "Syllabes",
    description: "Lis des syllabes",
    emoji: "🧩",
    couleur: "bg-secondary",
    lien: "/syllabes",
  },
  {
    titre: "Lecture",
    description: "Lis des mots",
    emoji: "📖",
    couleur: "bg-fun-purple",
    lien: "/lecture",
  },
  {
    titre: "Écriture",
    description: "Écris au doigt",
    emoji: "✏️",
    couleur: "bg-fun-green",
    lien: "/ecriture",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <AppLayout afficherRetour={false}>
      <div className="px-4 pt-6 pb-4">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <img
            src={heroImage}
            alt="Enfants qui lisent"
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-4">
            <div>
              <h1 className="text-2xl font-black text-card">LireMalin 📚</h1>
              <p className="text-sm text-card/90 font-semibold">
                Apprends à lire en t'amusant !
              </p>
            </div>
          </div>
        </div>

        {/* Grille des modules */}
        <h2 className="text-lg font-bold text-foreground mb-3">Choisis une activité</h2>
        <div className="grid grid-cols-2 gap-3">
          {modulesList.map((m, i) => (
            <button
              key={m.titre}
              onClick={() => navigate(m.lien)}
              className={`${m.couleur} text-card rounded-2xl p-5 text-left active:scale-95 transition-transform animate-slide-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl block mb-2">{m.emoji}</span>
              <h3 className="font-bold text-base">{m.titre}</h3>
              <p className="text-xs opacity-90">{m.description}</p>
            </button>
          ))}
        </div>

        {/* Bouton tableau de bord parent */}
        <button
          onClick={() => navigate("/parent")}
          className="mt-4 w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
        >
          <span className="text-2xl">👨‍👩‍👧</span>
          <div className="text-left">
            <h3 className="font-bold text-foreground text-sm">Espace Parent</h3>
            <p className="text-xs text-muted-foreground">Suivre la progression</p>
          </div>
        </button>
      </div>
    </AppLayout>
  );
};

export default Index;
