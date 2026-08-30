import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Github, Instagram, MessageCircle } from 'lucide-react';

export default function App() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [pixelData, setPixelData] = useState<Uint8ClampedArray | null>(null);
  const [imgNaturalSize, setImgNaturalSize] = useState({ width: 0, height: 0 });
  const [isOverPerson, setIsOverPerson] = useState(false);

  useEffect(() => {
    document.title = 'Adi Bin Sheraz — Full Stack Developer & Digital Crafter | Portfolio';
  }, []);

  // Pre-load image into offscreen canvas for pixel-perfect alpha hit testing
  useEffect(() => {
    const img = new Image();
    img.src = '/portrait.svg';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
        setPixelData(data);
        setImgNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      }
    };
  }, []);

  const checkPixelAlpha = (clientX: number, clientY: number): boolean => {
    if (!imgRef.current || !pixelData || imgNaturalSize.width === 0) return false;
    const rect = imgRef.current.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return false;
    }
    const normX = (clientX - rect.left) / rect.width;
    const normY = (clientY - rect.top) / rect.height;
    const px = Math.floor(normX * imgNaturalSize.width);
    const py = Math.floor(normY * imgNaturalSize.height);

    if (px < 0 || px >= imgNaturalSize.width || py < 0 || py >= imgNaturalSize.height) {
      return false;
    }

    const alpha = pixelData[(py * imgNaturalSize.width + px) * 4 + 3];
    return alpha > 30; // only non-transparent pixels of the person
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    const hit = checkPixelAlpha(e.clientX, e.clientY);
    setIsOverPerson(hit);
  };

  const handlePointerLeave = () => {
    setIsOverPerson(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (checkPixelAlpha(e.clientX, e.clientY)) {
      window.open('https://instagram.com/adibinsheraz', '_blank', 'noopener,noreferrer');
    }
  };

  const navItems = [
    { label: 'Message', href: 'https://wa.me/923139033546', external: true },
  ];

  const socialItems = [
    {
      label: 'Email',
      href: 'mailto:adi.binsheraz@gmail.com',
      external: false,
      icon: Mail,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/adibinsheraz-ctrl',
      external: true,
      icon: Github,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/adibinsheraz',
      external: true,
      icon: Instagram,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/923139033546',
      external: true,
      icon: MessageCircle,
    },
    {
      label: 'Phone',
      href: 'tel:03139033546',
      external: false,
      icon: Phone,
    },
  ];

  return (
    <main id="main-content" role="main" aria-label="Adi Bin Sheraz — Portfolio" className="relative h-[100dvh] w-full overflow-hidden bg-black text-cream font-hn select-none">
      {/* Background image (full-bleed, behind everything) */}
      <img
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85"
        alt="Dark moody background — Adi Bin Sheraz portfolio atmosphere"
        width={1280}
        height={853}
        className="absolute inset-0 h-full w-full object-cover anim-fade-in"
        loading="eager"
        fetchPriority="high"
      />

      {/* Marquee name (z-10, behind front cutout) */}
      <div
        className="absolute inset-x-0 top-[26vh] sm:top-[24vh] z-10 overflow-hidden anim-fade-up pointer-events-none"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee flex w-max whitespace-nowrap font-gallos text-[16vh] sm:text-[26vh] leading-none text-cream tracking-tight">
          <span className="pr-[6vw] inline-block">Adi Bin Sheraz &mdash;&nbsp;</span>
          <span className="pr-[6vw] inline-block" aria-hidden="true">Adi Bin Sheraz &mdash;&nbsp;</span>
        </div>
      </div>

      {/* Horizontal cream rule */}
      <div
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line"
        style={{ animationDelay: '1200ms' }}
      />

      {/* Front portrait (cutout overlay with pixel-perfect alpha hit-testing) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-visible">
        <img
          ref={imgRef}
          src="/portrait.svg"
          alt="Adi Bin Sheraz"
          width={800}
          height={1200}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className={`pointer-events-auto h-[88vh] min-[375px]:h-[95vh] min-[414px]:h-[100vh] sm:h-[115vh] md:h-[120vh] lg:h-[130vh] xl:h-[135vh] w-auto max-w-none object-contain anim-rise-in select-none transition-opacity duration-300 ${
            isOverPerson ? 'cursor-pointer hover:opacity-95' : 'cursor-default'
          }`}
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {/* Header (z-30) */}
      <header role="banner" className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        {/* Top Left Signature Name */}
        <div
          className="anim-fade-up select-none flex items-center"
          style={{ animationDelay: '800ms' }}
        >
          <span className="font-canasita text-4xl sm:text-5xl lg:text-6xl text-black tracking-wide hover:opacity-85 transition-opacity">
            ADI
          </span>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
          {/* Nav / Message button */}
          <nav aria-label="Primary navigation" className="flex items-center">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')}
                className="button anim-fade-up"
                style={{ animationDelay: `${1000 + idx * 80}ms` }}
                aria-label={item.label}
              >
                <div className="button-outer">
                  <div className="button-inner">
                    <span>{item.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Top Social Icons (Desktop) */}
          <div className="hidden sm:flex items-center gap-4" aria-label="Social media links">
            {socialItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className="text-cream/80 hover:text-cream hover:opacity-100 hover:scale-110 transition-all duration-300 anim-fade-up p-1"
                  style={{ animationDelay: `${1150 + idx * 60}ms` }}
                >
                  <IconComponent size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Footer (z-30 on mobile, sm:z-10 on desktop) */}
      <footer role="contentinfo" aria-label="Footer with role and contact information" className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream">
        {/* Footer left */}
        <div
          className="anim-fade-up flex flex-col"
          style={{ animationDelay: '1400ms' }}
        >
          <span className="font-medium">Full Stack Developer</span>
          <span>Digital Crafter</span>
          <span>Human</span>
        </div>

        {/* Footer right: Name & Social Icons */}
        <div
          className="anim-fade-up text-right flex flex-col items-end gap-1.5"
          style={{ animationDelay: '1550ms' }}
        >
          <span className="font-medium">Adi Bin Sheraz</span>
          <div className="flex items-center gap-3 pt-0.5">
            {socialItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className="text-cream/80 hover:text-cream hover:opacity-100 hover:scale-110 transition-all duration-300"
                >
                  <IconComponent size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </main>
  );
}
