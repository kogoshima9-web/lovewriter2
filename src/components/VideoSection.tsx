import { useEffect, useRef, useState } from "react";

const VideoSection = () => {
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
        Video
      </h2>
      <div
        className={`max-w-5xl aspect-video transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <iframe
          className="w-full h-full rounded"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Music Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
        />
      </div>
    </section>
  );
};

export default VideoSection;
