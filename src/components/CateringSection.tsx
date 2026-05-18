const cateringFeatures = [
    {
        title: "Ambiance et cadre",
        description:
            "Un lieu raffiné et accueillant. Profitez d’un cadre élégant où chaque détail a été pensé pour créer une atmosphère chaleureuse et sophistiquée.",
        image: "cat1.jpg",
    },
    {
        title: "Équipe de service",
        description:
            "Notre personnel qualifié combine savoir-faire et courtoisie pour vous offrir un service impeccable.",
        image: "cat.jpg",
    },
    {
        title: "Une solide expertise",
        description:
            "Des années d'expérience dans la gestion d'événements et la préparation de menus sur mesure pour garantir une expérience inoubliable.",
        image: "cat3.jpg",
    },
];

export default function CateringSection() {
    return (
        <section className="py-20 bg-cream" id="catering">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-dark leading-tight">
                        GASTRONOMIE D’EXCELLENCE
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <span className="text-dark/60 text-xs uppercase tracking-widest">
                            L’art culinaire réinventé
                        </span>
                        <h3 className="text-3xl md:text-5xl font-display text-dark leading-tight">
                            Lounge le 31
                        </h3>
                        <span className="text-dark/60 text-xs uppercase tracking-widest">
                            Bietry
                        </span>
                    </div>
                    <p className="text-dark/70 text-sm max-w-xl mx-auto mt-6 leading-relaxed">
                        Le Restaurant Lounge Le 31 à Bietry, Abidjan, apporte l’élégance et la chaleur de son service directement à votre table. Des menus sur mesure aux buffets raffinés, nous combinons saveurs uniques, style et attention au détail, pour transformer chaque occasion en un moment inoubliable.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {cateringFeatures.map((feature) => (
                        <div key={feature.title} className="group">
                            <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="font-display text-dark text-lg text-center mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-dark/60 text-xs text-center leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
