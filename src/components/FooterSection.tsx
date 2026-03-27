const FooterSection = () => (
  <footer className="section-dark py-16 px-8 md:px-12 border-t border-border">
    <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
      <p className="font-display text-foreground text-2xl tracking-wide">
        Abdo Fadli
      </p>
      <div className="flex gap-8">
        {[
          { name: "YouTube", icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
          { name: "Instagram", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z" },
        ].map((social) => (
          <a
            key={social.name}
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors duration-500"
            aria-label={social.name}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={social.icon} />
            </svg>
          </a>
        ))}
      </div>
      <p className="font-body text-muted-foreground text-xs tracking-wider">
        © 2026 All Rights Reserved
      </p>
    </div>
  </footer>
);

export default FooterSection;
