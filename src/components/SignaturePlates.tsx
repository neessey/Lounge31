const menuItems = [
    {
        name: "Macaron Hibiscus & Foie Gras",
        description:
            "Un macaron aux saveurs exotiques de hibiscus et de foie gras, une combinaison audacieuse et raffinée.",
    },
    {
        name: "Duo de Gambas Nacrées & Escabèche",
        description:
            "Gambas juteuses accompagnées de sa verveine Mélisse, offrant un équilibre parfait entre douceur et acidité.",
    },
    {
        name: "Pistris Rôti, caviar d’Aquitaine",
        description:
            "Consommé de Vodka fumée et Shimeji, une expérience gastronomique luxueuse.",
    },
    {
        name: "Poire Pochée",
        description:
            "Nappage Fruit Rouge et Gelée de Champagne, un dessert classique revisité.",
    },
    {
        name: "Magret de Canard, autour de la betterave rouge",
        description:
            "Magret de Canard rôti, chips de betterave et condiment de fraise wakamé.",
    },
    {
        name: "Dos de Cerf, basse température",
        description:
            "Accompagné de son jus court, déclinaison de courge.",
    },
    {
        name: "Douceur de Guimauve autour du Cèpe",
        description:
            "Un dessert innovant mêlant la douceur de la guimauve aux saveurs terreuses du cèpe.",
    },
    {
        name: "La tête tourne autour du Cigare",
        description:
            "Sphère de chocolat, crème cigare et son crémeux de patates douces passion",
    },
];

export default function SignaturePlates() {
    return (
        <section className="py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Menu List */}
                    <div className="bg-cream-light p-8 rounded-lg">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display text-dark leading-tight">
                                    MENU
                                </h2>
                                <h2 className="text-3xl md:text-4xl font-display text-dark leading-tight">
                                    SIGNATURE
                                </h2>
                            </div>
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-dark"
                            >
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="16" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </div>

                        <div className="space-y-6">
                            {menuItems.map((item) => (
                                <div key={item.name} className="border-b border-dark/10 pb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-dark text-sm">
                                            {item.name}
                                        </h3>

                                    </div>
                                    <p className="text-dark/60 text-xs leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>


                    </div>

                    {/* Signature Dishes Section */}
                    <div className="lg:sticky lg:top-24">
                        <h2 className="text-3xl md:text-4xl font-display text-dark leading-tight mb-2">
                            RECETTES AUDACIEUSES,
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-display text-dark leading-tight mb-6">
                            ÂME CLASSIQUE
                        </h2>
                        <p className="text-dark/70 text-sm leading-relaxed mb-8">
                            Chaque plat est une histoire, chaque saveur un héritage.
                            Des recettes transmises, affinées et pensées pour aujourd’hui. <br />Pour votre première découverte ou votre plat préféré, l’expérience reste inoubliable."
                        </p>


                        <div className="mt-8 rounded-lg overflow-hidden">
                            <img
                                src="sign.jpg"
                                alt="Signature Dish"
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
