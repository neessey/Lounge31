"use client";

const reviews = [
  {
    text: "Une expérience absolument merveilleuse du début à la fin. Je recommande vivement ce restaurant à tous ceux qui recherchent une cuisine exceptionnelle et un service impeccable.",
    author: "Rahul S.",
    stars: 5,
  },
  {
    text: "Fantastique expérience culinaire! Les plats étaient savoureux et le service vraiment a la hauteur des attentes de mon mari et moi.",
    author: "Marie R.",
    stars: 5,
  },
  {
    text: "Absolument incroyable! Le meilleur restaurant que j'ai jamais visité.",
    author: "James T.",
    stars: 5,
  },
  {
    text: "Les saveurs sont incroyables et le service est impeccable. Un must à Abidjan!",
    author: "Elizabeth M.",
    stars: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display text-dark leading-tight">
              CE QUE NOS
            </h2>
            <h2 className="text-4xl md:text-5xl font-display text-dark leading-tight">
              CLIENTS DISENT
            </h2>
          </div>

          {/* Google Rating */}
          <div className="bg-cream-light rounded-xl shadow-sm p-4 flex items-center gap-4">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="https://ext.same-assets.com/3269557936/1888167183.png"
                    alt="Star"
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-dark">4.7</span>
                <span className="text-dark/60 text-xs">/5</span>
              </div>
              <p className="text-xs text-dark/80 font-medium">Excellent</p>
              <p className="text-xs text-dark/60">Basé 3,576 avis</p>
            </div>
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-cream-light rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <img
                        key={i}
                        src="https://ext.same-assets.com/3269557936/1888167183.png"
                        alt="Star"
                        className="w-3 h-3"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-dark text-sm leading-relaxed mb-6">
                  {review.text}
                </p>
                <div>
                  <p className="text-dark/60 text-xs">Auteurs</p>
                  <p className="text-dark font-medium text-sm">
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Review CTA */}
        <div className="text-center mt-12">
          <p className="text-dark/60 text-sm mb-2">
            Avez-vous apprécié votre expérience chez nous?
          </p>
          <button
            type="button"
            className="text-dark text-sm underline hover:no-underline"
          >
            Laissez-nous un avis
          </button>
        </div>
      </div>
    </section>
  );
}
