const drinks = [
    {
        name: "Ratafia d’Alsace",
        description:
            "Un délicieux liqueur d’Alsace, parfaitement équilibrée entre douceur et acidité.",
    },
    {
        name: "Montagny Les Buis – Bourgogne Blanc",
        description: "Un vin blanc équilibré et lumineux, aux arômes floraux et légèrement beurrés. ",
    },
    {
        name: "Blanc de Blancs – Laurent-Perrier",
        description: "Champagne d’une grande pureté, aux bulles fines et à la fraîcheur éclatante.",
    },
    {
        name: "Hautes-Côtes de Beaune Blanc",
        description:
            "Vieilles Vignes 2020 – Domaine Philippe Germain\nUn blanc de caractère, issu de vieilles vignes, offrant complexité et profondeur. Arômes de fruits blancs et finale élégamment minérale.",
    },
    {
        name: "Les Arènes 2015 – M. Chapoutier",
        description: "Un vin intense et expressif, marqué par des arômes de fruits noirs, de réglisse et d’épices. Ample et soyeux, il séduit par sa profondeur.",
    },
    {
        name: "Champagne Sous Bois – Billecart-Salmon",
        description:
            "Un champagne rare et complexe, vinifié sous bois. Notes toastées, fruits secs et grande profondeur aromatique pour une finale d’exception.",
    },
];

export default function DrinksSection() {
    return (
        <section className="py-20 bg-dark-green text-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Drinks Menu */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display text-gold leading-tight mb-2">
                            L’ART DES BOISSONS
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-display text-gold leading-tight mb-2">
                            AU COEUR
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-display text-cream leading-tight mb-6">
                            DE L'INSTANT
                        </h2>
                        <p className="text-cream/70 text-sm mb-8 leading-relaxed">
                            Au 31, les boissons ne se contentent pas d’accompagner le repas : elles en prolongent le plaisir.
                        </p>


                        <div className="space-y-6">
                            {drinks.map((drink) => (
                                <div key={drink.name} className="border-b border-cream/20 pb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-cream text-sm">
                                            {drink.name}
                                        </h3>

                                    </div>
                                    <p className="text-cream/50 text-xs leading-relaxed">
                                        {drink.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Drink Images */}
                    <div className="space-y-6">
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src="drink.jpg"
                                alt="Cocktail"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src="drink2.jpg"
                                alt="Whiskey"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
