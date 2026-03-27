import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [bookVisible, setBookVisible] = useState(false);
  const [splashParticles, setSplashParticles] = useState<{ id: number; x: number; y: number; angle: number; delay: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      heroRef.current.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    const particles = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      particles.push({
        id: i,
        x: Math.cos(angle) * 80,
        y: Math.sin(angle) * 80,
        angle: angle,
        delay: i * 30,
      });
    }
    setSplashParticles(particles);
    setBookVisible(true);
  };

  const handleMouseLeave = () => {
    setSplashParticles([]);
    setBookVisible(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 animate-slow-zoom"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Cinematic Overlay */}
      <div className="cinematic-overlay absolute inset-0 z-10" />

      {/* Book reveal on hover - positioned over the book area in the image */}
      <div
        className="absolute z-20 left-1/2 top-[55%] -translate-x-1/2 w-32 h-44"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Splash particles */}
        {splashParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, #8B4513, #D2691E)",
              transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) scale(0)`,
              animation: bookVisible 
                ? `splashOut 0.6s ease-out ${particle.delay}ms forwards` 
                : `splashIn 0.3s ease-in forwards`,
              boxShadow: "0 0 6px rgba(139, 69, 19, 0.6)",
            }}
          />
        ))}
        
        {/* Central glow ring */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(210, 105, 30, 0.4) 0%, transparent 70%)",
            animation: bookVisible ? "glowPulse 1.5s ease-in-out infinite" : "none",
          }}
        />

        {/* Book content */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            opacity: bookVisible ? 1 : 0,
            transform: bookVisible ? "scale(1)" : "scale(0.8)",
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            pointerEvents: bookVisible ? "auto" : "none",
          }}
        >
          <div 
            className="w-full h-full rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(150 8% 14% / 0.9), hsl(150 16% 5% / 0.95))",
              backdropFilter: "blur(8px)",
              boxShadow: bookVisible 
                ? "0 0 40px rgba(210, 105, 30, 0.3), inset 0 0 20px rgba(210, 105, 30, 0.1)" 
                : "none",
              border: "1px solid rgba(210, 105, 30, 0.3)",
            }}
          >
            <div className="text-center px-2">
              <p className="font-display text-foreground text-sm tracking-widest uppercase opacity-70">
                New Book
              </p>
              <p className="font-display text-foreground text-lg font-semibold mt-1">
                قهوة
              </p>
              <p className="font-body text-muted-foreground text-xs mt-2 tracking-wider uppercase">
                Available Now
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Name - Top Left */}
      <div className="absolute top-8 left-8 md:left-12 z-20 animate-fade-in-up">
        <h1 className="font-display text-foreground text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight uppercase">
          Abdo
          <br />
          Fadli
        </h1>
      </div>

      {/* Navigation - Top Right */}
      <nav className="absolute top-10 right-8 md:right-12 z-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <ul className="flex gap-6 md:gap-8">
          {["BOOKS", "ABOUT", "CONTACT"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-body text-foreground text-xs md:text-sm tracking-[0.25em] uppercase hover:opacity-60 transition-opacity duration-500"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Panel - Left Side */}
      <div
        className="absolute bottom-12 left-8 md:left-12 z-20 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">
          Follow
        </p>
        <div className="flex flex-col gap-4">
          {[
            { name: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
            { name: "Instagram", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z" },
            { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="text-foreground opacity-60 hover:opacity-100 transition-opacity duration-500"
              aria-label={social.name}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="w-px h-12 bg-foreground/30 mx-auto mb-2" />
        <p className="font-body text-muted-foreground text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
