import { useEffect, useState, useCallback } from "react";

interface Grain {
  id: number;
  x: number;
  y: number;
  driftX: number;
  rotation: number;
  scale: number;
}

const CoffeeCursorTrail = () => {
  const [grains, setGrains] = useState<Grain[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const addGrain = useCallback((x: number, y: number) => {
    const newGrain: Grain = {
      id: Date.now() + Math.random(),
      x,
      y,
      driftX: (Math.random() - 0.5) * 60,
      rotation: Math.random() * 360 - 180,
      scale: 0.6 + Math.random() * 0.5,
    };

    setGrains((prev) => [...prev, newGrain]);

    setTimeout(() => {
      setGrains((prev) => prev.filter((g) => g.id !== newGrain.id));
    }, 1500);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const now = Date.now();

      setMousePos({ x: clientX, y: clientY });
      setIsVisible(true);

      const distance = Math.sqrt(
        Math.pow(clientX - lastX, 2) + Math.pow(clientY - lastY, 2)
      );

      if (distance > 15 && now - lastTime > 30) {
        addGrain(clientX, clientY);
        lastX = clientX;
        lastY = clientY;
        lastTime = now;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [addGrain]);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-3 h-4 rounded-full"
          style={{
            background: "linear-gradient(180deg, #8B4513 0%, #5D3A1A 100%)",
            boxShadow: "0 0 8px rgba(139, 69, 19, 0.6), 0 2px 4px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Falling grains */}
      {grains.map((grain) => (
        <div
          key={grain.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: grain.x,
            top: grain.y,
            animation: "coffeeFall 1.5s ease-out forwards",
            "--drift-x": `${grain.driftX}px`,
            "--rotation": `${grain.rotation}deg`,
          } as React.CSSProperties}
        >
          <div
            className="w-[5px] h-[7px] rounded-[40%_60%_50%_50%]"
            style={{
              background: `linear-gradient(135deg, 
                hsl(25, ${50 + Math.random() * 20}%, ${20 + Math.random() * 15}%) 0%, 
                hsl(25, ${40 + Math.random() * 20}%, ${10 + Math.random() * 10}%) 100%)`,
              transform: `scale(${grain.scale})`,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CoffeeCursorTrail;
