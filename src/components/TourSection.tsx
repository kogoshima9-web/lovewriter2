import { useEffect, useRef, useState } from "react";

const tourDates = [
  { city: "Casablanca", venue: "Théâtre Mohammed V", date: "Apr 15, 2026" },
  { city: "Marrakech", venue: "Palais des Congrès", date: "May 02, 2026" },
  { city: "Paris", venue: "La Cigale", date: "May 20, 2026" },
  { city: "London", venue: "Barbican Centre", date: "Jun 08, 2026" },
  { city: "Berlin", venue: "Volksbühne", date: "Jun 22, 2026" },
];

const TourSection = () => {
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
    <section ref={ref} className="section-dark py-24 md:py-32 px-8 md:px-12 border-t border-border">
      <h2
        className={`font-display text-foreground text-4xl md:text-6xl font-light tracking-wide mb-16 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Live
      </h2>
      <div className="max-w-4xl">
        {tourDates.map((show, i) => (
          <div
            key={show.city}
            className={`flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="flex-1">
              <p className="font-display text-foreground text-2xl md:text-3xl font-light">
                {show.city}
              </p>
              <p className="font-body text-muted-foreground text-sm mt-1">
                {show.venue}
              </p>
            </div>
            <p className="font-body text-muted-foreground text-sm tracking-wider mt-2 md:mt-0 md:mr-8">
              {show.date}
            </p>
            <a
              href="#"
              className="font-body text-foreground text-xs tracking-[0.25em] uppercase border border-border px-6 py-3 mt-4 md:mt-0 hover:bg-foreground hover:text-primary-foreground transition-all duration-500 inline-block text-center"
            >
              Order a Book
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourSection;
