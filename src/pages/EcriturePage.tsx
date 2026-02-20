import { useRef, useState, useEffect, useCallback } from "react";
import AppLayout from "@/components/AppLayout";
import { ALPHABET } from "@/lib/data";
import { useSpeech } from "@/hooks/useSpeech";
import { Eraser, ChevronLeft, ChevronRight } from "lucide-react";

const EcriturePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [indexLettre, setIndexLettre] = useState(0);
  const { parler } = useSpeech();

  const lettre = ALPHABET[indexLettre];

  const effacerCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Afficher la lettre en filigrane
    ctx.fillStyle = "hsla(35, 30%, 80%, 0.4)";
    ctx.font = `bold ${canvas.width * 0.6}px Nunito`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lettre.majuscule, canvas.width / 2, canvas.height / 2);
  }, [lettre.majuscule]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Adapter à la taille du conteneur
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientWidth;
    }
    effacerCanvas();
  }, [indexLettre, effacerCanvas]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "hsl(15, 85%, 58%)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const changerLettre = (delta: number) => {
    setIndexLettre((prev) => {
      const next = prev + delta;
      if (next < 0) return ALPHABET.length - 1;
      if (next >= ALPHABET.length) return 0;
      return next;
    });
    const nouvLettre = ALPHABET[(indexLettre + delta + ALPHABET.length) % ALPHABET.length];
    parler(nouvLettre.majuscule);
  };

  return (
    <AppLayout titre="Écriture">
      <div className="px-4 pt-4">
        {/* Lettre à tracer */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changerLettre(-1)}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="text-center">
            <span className="text-5xl font-black text-primary">{lettre.majuscule}</span>
            <p className="text-sm text-muted-foreground font-semibold">
              Trace la lettre {lettre.majuscule}
            </p>
          </div>
          <button
            onClick={() => changerLettre(1)}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Zone de dessin */}
        <div className="bg-card rounded-2xl border-2 border-dashed border-border overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            className="w-full cursor-crosshair"
          />
        </div>

        {/* Bouton effacer */}
        <button
          onClick={effacerCanvas}
          className="mt-3 w-full bg-muted text-foreground rounded-xl py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Eraser className="w-4 h-4" />
          Effacer
        </button>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Utilise ton doigt pour tracer la lettre ✏️
        </p>
      </div>
    </AppLayout>
  );
};

export default EcriturePage;
