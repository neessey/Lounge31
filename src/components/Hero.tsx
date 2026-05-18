export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="hero.png"
                    alt="Amrit Palace Restaurant"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/70" />
            </div>

            {/* Established - Right */}
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-10">
                <p className="text-cream/80 text-xs tracking-[0.3em] uppercase writing-mode-vertical-rl ">
                    Etabli en 2022
                </p>
            </div>
            {/* Serving Central Florida - Top */}
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10">
                <p className="text-cream/80 text-xs tracking-[0.3em] uppercase writing-mode-vertical-rl ">
                    En Cote d'Ivoire
                </p>
            </div>
            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">


                {/* Main Title */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl  text-gold leading-none mb-5 pt-4">
                    SAVEURS
                </h1>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-display text-cream leading-none mb-2">
                    INOUBLIABLES
                </h1>


                {/* Description */}
                <p className="text-cream/70 text-sm max-w-md mx-auto mt-8 leading-relaxed">
                    Au Restaurant Lounge Le 31, chaque plat célèbre l’art de la gastronomie et chaque instant est pensé pour être inoubliable. Nous allions la passion des saveurs uniques, l’élégance d’une expérience culinaire raffinée, et le rythme de la vie contemporaine.
                </p>
            </div>

            {/* Google Rating Badge */}
            <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-10">
                <div className="bg-cream rounded-xl shadow-lg p-4 flex items-center gap-4">
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
                            <span className="text-3xl font-bold text-dark">4.7</span>
                            <span className="text-dark/60 text-xs">/5</span>
                        </div>
                        <p className="text-xs text-dark/80 font-medium">Excellent</p>
                        <p className="text-xs text-dark/60">Based on 3,576 reviews</p>
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
        </section>
    );
}
