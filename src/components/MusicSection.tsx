import { useEffect, useRef, useState } from "react";

const albums = [
  { title: "Whispers in the Fog", image: "/images/album1.jpg" },
  { title: "Midnight Portrait", image: "/images/album2.jpg" },
  { title: "Forest Moon", image: "/images/album3.jpg" },
];

const MusicSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-dark py-24 md:py-32 px-8 md:px-12">
      <h2
        className={`font-display text-foreground text-4xl md:text-6xl font-light tracking-wide mb-16 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Latest Music
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {albums.map((album, i) => (
          <div
            key={album.title}
            className={`group relative overflow-hidden rounded cursor-pointer transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={album.image}
                alt={album.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors duration-700 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-center">
                {/* Play Icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-foreground mx-auto mb-3"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-display text-foreground text-lg tracking-wide">
                {album.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MusicSection;
