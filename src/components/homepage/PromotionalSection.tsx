'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PromotionalContent } from '@/types/homepage';

interface PromotionalSectionProps {
  content: PromotionalContent;
}

export function PromotionalSection({ content }: PromotionalSectionProps) {
  const {
    image,
    imageAlt,
    title,
    description,
    discount,
    ctaText,
    ctaLink,
    validUntil,
  } = content;

  const isValidOffer = validUntil ? new Date(validUntil) > new Date() : true;

  if (!isValidOffer) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 shadow-xl">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover opacity-20"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>

          <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                {discount && (
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-2xl font-bold">{discount}</span>
                  </div>
                )}

                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {title}
                </h2>

                <p className="text-xl mb-6 text-white/90 leading-relaxed">
                  {description}
                </p>

                {validUntil && (
                  <p className="text-sm mb-6 text-white/80">
                    Valid until {new Date(validUntil).toLocaleDateString()}
                  </p>
                )}

                <Link href={ctaLink}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {ctaText}
                  </Button>
                </Link>
              </div>

              <div className="hidden lg:block">
                <div className="relative aspect-square max-w-md mx-auto">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover rounded-xl shadow-2xl"
                    sizes="(max-width: 1024px) 0vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
