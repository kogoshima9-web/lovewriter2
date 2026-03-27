import { useEffect, useRef } from "react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      heroRef.current.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
