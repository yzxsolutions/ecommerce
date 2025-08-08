'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BannerContent } from '@/types/homepage';

interface HeroBannerProps {
  content: BannerContent;
}

export function HeroBanner({ content }: HeroBannerProps) {
  const {
    image,
    imageAlt,
    heading,
    subheading,
    ctaText,
    ctaLink,
    backgroundColor = '#f8fafc',
    textColor = '#1f2937',
  } = content;

  return (
    <section
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg"
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            style={{ color: textColor }}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md"
              style={{ color: textColor }}
            >
              {subheading}
            </p>
          )}

          {ctaText && ctaLink && (
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                {ctaText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
