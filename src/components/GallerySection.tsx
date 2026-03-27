import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/images/gallery1.jpg", span: "md:col-span-2" },
  { src: "/images/gallery2.jpg", span: "md:row-span-2" },
  { src: "/images/gallery3.jpg", span: "md:col-span-2" },
  { src: "/images/gallery4.jpg", span: "" },
];

const GallerySection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
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
        Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={`group relative overflow-hidden rounded cursor-pointer ${photo.span} transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <img
              src={photo.src}
              alt="Gallery"
              loading="lazy"
              className="w-full h-64 md:h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
