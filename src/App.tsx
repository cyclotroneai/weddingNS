import { useEffect, useRef, useState, type ReactNode } from "react";
import couplePortrait from "@/imports/nI_.png";
import landingVideo from "@/imports/landing_video.mp4";
import weddingMusic from "@/imports/music.mp3";

const WEDDING_DATE = new Date("2026-11-12T16:00:00+05:30");
const MAPS_URL =
  "https://www.google.com/maps?rlz=1C1ONGR_enAE1172AE1172&um=1&ie=UTF-8&fb=1&gl=ae&sa=X&geocode=Kb_1cbgPxKc7MVJePfqsUujK&daddr=Ezhumangad,+Thirumittacode-I,+Kerala+679532,+India";

/* ---------- small primitives ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <span className="h-px w-12 sm:w-20 gold-line" />
      <svg width="26" height="26" viewBox="0 0 26 26" className="text-champagne">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.85"
        >
          <path d="M13 1l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
          <circle cx="13" cy="13" r="2.4" />
        </g>
      </svg>
      <span className="h-px w-12 sm:w-20 gold-line" />
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[0.7rem] sm:text-xs uppercase tracking-luxe text-champagne font-body font-medium">
      {children}
    </span>
  );
}

/* ---------- countdown ---------- */

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="border border-champagne/25 bg-white/40 backdrop-blur-sm py-4 sm:py-6 rounded-sm">
            <div className="font-display text-3xl sm:text-5xl text-charcoal tabular-nums leading-none">
              {String(it.value).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-2 text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-charcoal-soft">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- envelope cover ---------- */

function Cover({ onOpen, opening }: { onOpen: () => void; opening: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[1400ms] ${
        opening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDelay: opening ? "900ms" : "0ms" }}
    >
      {/* two panels */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 paper-texture border-r border-champagne/20 origin-left transition-transform duration-[1600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          opening ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 paper-texture border-l border-champagne/20 origin-right transition-transform duration-[1600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          opening ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* centered content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          opening ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"
        }`}
      >
        <p className="font-arabic text-2xl sm:text-3xl text-charcoal mb-5 leading-relaxed">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <Divider />
        <p className="mt-6 text-xs uppercase tracking-luxe text-champagne">
          With the blessings of Allah
        </p>
        <h1 className="mt-6 font-display text-charcoal leading-[0.95]">
          <span className="block text-5xl sm:text-7xl">Noushad Ibrahim</span>
          <span className="block my-3 text-3xl sm:text-4xl italic text-champagne">
            &amp;
          </span>
          <span className="block text-5xl sm:text-7xl">Shifna</span>
        </h1>
        <p className="mt-8 font-display text-xl sm:text-2xl tracking-[0.3em] text-charcoal-soft">
          12 • 11 • 2026
        </p>
        <p className="mt-4 text-sm text-charcoal-soft">
          Amana Convention Centre
          <br />
          Ezhumangad
        </p>
        <button
          onClick={onOpen}
          className="group mt-10 relative overflow-hidden border border-champagne px-9 py-3.5 text-[0.7rem] uppercase tracking-luxe text-charcoal transition-colors duration-500 hover:text-ivory"
        >
          <span className="relative z-10">Open Invitation</span>
          <span className="absolute inset-0 -z-0 bg-champagne translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
        </button>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={landingVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <p className="animate-[fadeUp_1.2s_ease-out_both] text-[0.7rem] uppercase tracking-luxe text-champagne-soft">
          Together with their families
        </p>
        <h1 className="mt-6 font-display leading-[0.92] animate-[fadeUp_1.4s_ease-out_0.15s_both]">
          <span className="block text-6xl sm:text-8xl">Noushad Ibrahim</span>
          <span className="block my-2 text-4xl sm:text-5xl italic text-champagne-soft">
            &amp;
          </span>
          <span className="block text-6xl sm:text-8xl">Shifna</span>
        </h1>
        <p className="mt-8 max-w-md text-sm sm:text-base font-light leading-relaxed text-ivory/90 animate-[fadeUp_1.6s_ease-out_0.3s_both]">
          invite you to celebrate their wedding
        </p>
        <div className="mt-8 flex flex-col items-center gap-2 animate-[fadeUp_1.8s_ease-out_0.45s_both]">
          <p className="font-display text-2xl sm:text-3xl tracking-[0.2em]">
            12 November 2026
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-ivory/80">
            Amana Convention Centre, Ezhumangad
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/80">
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <span className="relative h-9 w-px bg-ivory/30">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-champagne-soft animate-[scrollHint_2s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}

function VerseSection() {
  return (
    <Section className="text-center">
      <Reveal>
        <Kicker>Ar-Rum · 30:21</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-8 max-w-3xl font-arabic text-2xl sm:text-4xl leading-[2] text-charcoal">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div className="my-10">
          <Divider />
        </div>
      </Reveal>
      <Reveal delay={250}>
        <p className="mx-auto max-w-2xl font-display italic text-xl sm:text-2xl leading-relaxed text-charcoal-soft">
          &ldquo;And among His signs is that He created for you from yourselves
          mates that you may find tranquility in them; and He placed between you
          affection and mercy.&rdquo;
        </p>
      </Reveal>
    </Section>
  );
}

function SpecialDay() {
  return (
    <Section id="date" className="text-center bg-cream/40">
      <Reveal>
        <Kicker>Our Special Day</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-6 max-w-xl font-display text-2xl sm:text-3xl italic leading-snug text-charcoal">
          A beautiful beginning to a new journey, shared with the people who mean
          the most to us.
        </p>
      </Reveal>
      <Reveal delay={150}>
        <div className="my-12 flex items-center justify-center gap-6 sm:gap-10">
          <span className="h-px w-16 gold-line" />
          <div className="leading-none">
            <div className="font-display text-7xl sm:text-9xl text-charcoal">12</div>
            <div className="mt-2 text-sm uppercase tracking-luxe text-champagne">
              November
            </div>
            <div className="mt-1 font-display text-2xl text-charcoal-soft">2026</div>
          </div>
          <span className="h-px w-16 gold-line" />
        </div>
      </Reveal>
      <Reveal delay={200}>
        <Countdown />
      </Reveal>
    </Section>
  );
}

function Venue() {
  return (
    <Section id="venue">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <Kicker>The Celebration</Kicker>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl text-charcoal">
            Amana Convention Centre
          </h2>
          <p className="mt-3 text-charcoal-soft tracking-[0.15em] uppercase text-sm">
            Ezhumangad
          </p>
          <p className="mt-6 max-w-md leading-relaxed text-charcoal-soft font-light">
            Join us at a place of warmth and celebration as we exchange our vows
            surrounded by family and friends.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 border border-champagne px-8 py-3.5 text-[0.7rem] uppercase tracking-luxe text-charcoal transition-colors hover:bg-champagne hover:text-ivory"
          >
            View Location
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
        <Reveal delay={150}>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="block relative aspect-[4/5] overflow-hidden rounded-t-[999px] border border-champagne/30 paper-texture group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 240" className="h-full w-full text-champagne/40">
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M40 40h120M20 90h160M20 150h160M60 20v200M140 20v200" strokeOpacity="0.3" />
                  <path d="M100 70l10 20 22 3-16 15 4 22-20-10-20 10 4-22-16-15 22-3z" strokeOpacity="0.6" />
                </g>
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-white/50 py-4 text-xs uppercase tracking-[0.25em] text-charcoal backdrop-blur-sm">
              <span className="text-champagne">◉</span> Ezhumangad, Kerala
            </div>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

function Couple() {
  return (
    <Section id="couple" className="bg-cream/40 text-center">
      <Reveal>
        <Kicker>The Couple</Kicker>
        <h2 className="mt-4 font-display text-5xl sm:text-6xl text-charcoal">
          Two hearts, one journey
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-[2rem] border border-champagne/30 bg-white/40 p-3 shadow-[0_30px_80px_-30px_rgba(43,39,35,0.4)]">
          <img
            src={couplePortrait}
            alt="Noushad Ibrahim and Shifna in traditional wedding attire"
            className="w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </Reveal>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <Reveal delay={100}>
          <p className="text-[0.7rem] uppercase tracking-luxe text-champagne">
            The Groom
          </p>
          <h3 className="mt-2 font-display text-4xl text-charcoal">
            Noushad Ibrahim
          </h3>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[0.7rem] uppercase tracking-luxe text-champagne">
            The Bride
          </p>
          <h3 className="mt-2 font-display text-4xl text-charcoal">Shifna</h3>
        </Reveal>
      </div>
    </Section>
  );
}

function DetailIcon({ path }: { path: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="mx-auto text-champagne"
    >
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Details() {
  const items = [
    {
      label: "Date",
      value: "12 November 2026",
      path: "M7 2v3M17 2v3M3 8h18M4 5h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z",
    },
    {
      label: "Venue",
      value: "Amana Convention Centre",
      path: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6",
    },
    {
      label: "Location",
      value: "Ezhumangad",
      path: "M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z M12 13a3 3 0 100-6 3 3 0 000 6z",
    },
  ];
  return (
    <Section>
      <Reveal className="text-center">
        <Kicker>Wedding Details</Kicker>
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-champagne/25 bg-champagne/25 sm:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 100} className="bg-ivory">
            <div className="px-6 py-12 text-center">
              <DetailIcon path={it.path} />
              <p className="mt-5 text-[0.7rem] uppercase tracking-luxe text-champagne">
                {it.label}
              </p>
              <p className="mt-2 font-display text-2xl text-charcoal">{it.value}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Timeline() {
  const events = [
    {
      title: "Nikah Ceremony",
      time: "To be announced",
      desc: "The solemnisation of our marriage in the presence of loved ones.",
    },
    {
      title: "Reception",
      time: "To be announced",
      desc: "An evening of celebration, dining and warm togetherness.",
    },
  ];
  return (
    <Section id="the-day" className="bg-cream/40">
      <Reveal className="text-center">
        <Kicker>The Day</Kicker>
        <h2 className="mt-4 font-display text-5xl sm:text-6xl text-charcoal">
          Order of events
        </h2>
      </Reveal>
      <div className="relative mx-auto mt-16 max-w-2xl">
        <span className="absolute left-4 top-2 bottom-2 w-px gold-line sm:left-1/2" />
        <div className="space-y-12">
          {events.map((e, i) => (
            <Reveal
              key={e.title}
              delay={i * 120}
              className={`relative pl-12 sm:pl-0 sm:w-1/2 ${
                i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
              }`}
            >
              <span
                className={`absolute top-1.5 h-3 w-3 rounded-full border border-champagne bg-ivory left-[10px] sm:left-auto ${
                  i % 2 === 0 ? "sm:-right-[6px]" : "sm:-left-[6px]"
                }`}
              />
              <h3 className="font-display text-3xl text-charcoal">{e.title}</h3>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-champagne">
                {e.time}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-charcoal-soft">
                {e.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Blessings() {
  return (
    <Section className="text-center">
      <Reveal>
        <Kicker>With Love &amp; Blessings</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-8 max-w-2xl font-display text-2xl sm:text-3xl italic leading-relaxed text-charcoal">
          &ldquo;With the blessings of our families and the grace of Allah, we
          invite you to join us as we begin this beautiful journey together.&rdquo;
        </p>
      </Reveal>
      <Reveal delay={200}>
        <div className="my-8">
          <Divider />
        </div>
      </Reveal>
      <Reveal delay={250}>
        <p className="text-sm uppercase tracking-[0.25em] text-champagne">
          Your presence and prayers would mean the world to us
        </p>
      </Reveal>
    </Section>
  );
}

function FindUs() {
  return (
    <Section id="find-us" className="text-center">
      <Reveal>
        <Kicker>Find Us</Kicker>
        <h2 className="mt-4 font-display text-5xl sm:text-6xl text-charcoal">
          Amana Convention Centre
        </h2>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-charcoal-soft">
          Ezhumangad
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-3 border border-champagne px-9 py-3.5 text-[0.7rem] uppercase tracking-luxe text-charcoal transition-colors hover:bg-champagne hover:text-ivory"
        >
          Get Directions
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </Reveal>
    </Section>
  );
}

function Closing() {
  return (
    <section className="relative overflow-hidden bg-charcoal px-6 py-32 text-center text-ivory">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23cdb079' stroke-width='1'%3E%3Cpath d='M40 0l40 40-40 40L0 40z'/%3E%3Cpath d='M40 16l24 24-24 24-24-24z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="font-arabic text-2xl text-champagne-soft">
            إِن شَاءَ ٱللَّٰه
          </p>
          <p className="mt-8 font-display text-3xl sm:text-4xl italic leading-relaxed">
            Insha&rsquo;Allah, we look forward to celebrating this beautiful day
            with you.
          </p>
          <div className="my-10">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-champagne-soft/50" />
              <span className="text-champagne-soft">✦</span>
              <span className="h-px w-16 bg-champagne-soft/50" />
            </div>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl">Noushad &amp; Shifna</h2>
          <p className="mt-4 tracking-[0.3em] text-champagne-soft">12 • 11 • 2026</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="paper-texture px-6 py-14 text-center">
      <p className="font-display text-2xl text-charcoal">
        Noushad Ibrahim &amp; Shifna
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-charcoal-soft">
        12 November 2026
      </p>
      <p className="mt-6 text-[0.7rem] italic text-champagne">Made with love</p>
    </footer>
  );
}

/* ---------- music toggle ---------- */

function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/50 bg-ivory/80 text-champagne shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
    >
      <span className={`text-lg ${playing ? "float-slow" : ""}`}>♫</span>
      {playing && (
        <span className="absolute inset-0 rounded-full border border-champagne/40 animate-ping" />
      )}
    </button>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setOpening(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
    window.setTimeout(() => setOpened(true), 1700);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [opened]);

  return (
    <div className="paper-texture min-h-full">
      <audio ref={audioRef} src={weddingMusic} loop preload="auto" />

      {!opened && <Cover onOpen={handleOpen} opening={opening} />}

      <main
        className={`transition-opacity duration-1000 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <VerseSection />
        <SpecialDay />
        <Venue />
        <Couple />
        <Details />
        <Timeline />
        <Blessings />
        <FindUs />
        <Closing />
        <Footer />
      </main>

      {opened && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </div>
  );
}
