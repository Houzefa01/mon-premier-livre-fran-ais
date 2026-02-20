import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, PenTool, BarChart3, ArrowLeft } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
  titre?: string;
  afficherRetour?: boolean;
}

const AppLayout = ({ children, titre, afficherRetour = true }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const estAccueil = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Barre de navigation supérieure */}
      {!estAccueil && (
        <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-3">
          {afficherRetour && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          {titre && (
            <h1 className="text-lg font-bold text-foreground truncate">{titre}</h1>
          )}
        </header>
      )}

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Barre de navigation inférieure */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 py-2 flex justify-around items-center safe-area-bottom">
        <NavBtn
          icon={<Home className="w-5 h-5" />}
          label="Accueil"
          actif={location.pathname === "/"}
          onClick={() => navigate("/")}
        />
        <NavBtn
          icon={<BookOpen className="w-5 h-5" />}
          label="Alphabet"
          actif={location.pathname === "/alphabet"}
          onClick={() => navigate("/alphabet")}
        />
        <NavBtn
          icon={<PenTool className="w-5 h-5" />}
          label="Écriture"
          actif={location.pathname === "/ecriture"}
          onClick={() => navigate("/ecriture")}
        />
        <NavBtn
          icon={<BarChart3 className="w-5 h-5" />}
          label="Progrès"
          actif={location.pathname === "/parent"}
          onClick={() => navigate("/parent")}
        />
      </nav>
    </div>
  );
};

const NavBtn = ({
  icon,
  label,
  actif,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  actif: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
      actif
        ? "text-primary"
        : "text-muted-foreground"
    }`}
  >
    {icon}
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
);

export default AppLayout;
