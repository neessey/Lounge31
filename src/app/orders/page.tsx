'use client';
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, ChefHat, Wine, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CartItem = {
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
};

type MenuItem = {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
};

const menuItems = [
    {
        name: "Macaron Hibiscus & Foie Gras",
        description: "Un macaron aux saveurs exotiques de hibiscus et de foie gras, une combinaison audacieuse et raffinée.",
        price: 18,
        category: "Entrées",
        image: "mac.png"
    },

    {
        name: "Pistris Rôti, caviar d'Aquitaine",
        description: "Consommé de Vodka fumée et Shimeji, une expérience gastronomique luxueuse.",
        price: 38,
        category: "Plats",
        image: "cav.png"
    },
    {
        name: "Magret de Canard, autour de la betterave rouge",
        description: "Magret de Canard rôti, chips de betterave et condiment de fraise wakamé.",
        price: 32,
        category: "Plats",
        image: "can.png "
    },
    {
        name: "Dos de Cerf, basse température",
        description: "Accompagné de son jus court, déclinaison de courge.",
        price: 42,
        category: "Plats",
        image: "dos.png"
    },
    {
        name: "Poire Pochée",
        description: "Nappage Fruit Rouge et Gelée de Champagne, un dessert classique revisité.",
        price: 14,
        category: "Desserts",
        image: "poi.png"
    },

];

const drinks = [
    {
        name: "Ratafia d'Alsace",
        description: "Un délicieux liqueur d'Alsace, parfaitement équilibrée entre douceur et acidité.",
        price: 12,
        category: "Apéritifs",
        image: "placeholder.jpg"
    },
    {
        name: "Montagny Les Buis – Bourgogne Blanc",
        description: "Un vin blanc équilibré et lumineux, aux arômes floraux et légèrement beurrés.",
        price: 45,
        category: "Vins Blancs",
        image: "placeholder.jpg"
    },
    {
        name: "Blanc de Blancs – Laurent-Perrier",
        description: "Champagne d'une grande pureté, aux bulles fines et à la fraîcheur éclatante.",
        price: 85,
        category: "Champagnes",
        image: "placeholder.jpg"
    },
    {
        name: "Hautes-Côtes de Beaune Blanc",
        description: "Vieilles Vignes 2020 – Domaine Philippe Germain. Un blanc de caractère, issu de vieilles vignes, offrant complexité et profondeur. Arômes de fruits blancs et finale élégamment minérale.",
        price: 55,
        category: "Vins Blancs",
        image: "placeholder.jpg"
    },
    {
        name: "Les Arènes 2015 – M. Chapoutier",
        description: "Un vin intense et expressif, marqué par des arômes de fruits noirs, de réglisse et d'épices. Ample et soyeux, il séduit par sa profondeur.",
        price: 68,
        category: "Vins Rouges",
        image: "placeholder.jpg"
    },
    {
        name: "Champagne Sous Bois – Billecart-Salmon",
        description: "Un champagne rare et complexe, vinifié sous bois. Notes toastées, fruits secs et grande profondeur aromatique pour une finale d'exception.",
        price: 120,
        category: "Champagnes",
        image: "placeholder.jpg"
    }
];

export default function RestaurantOrder() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [activeTab, setActiveTab] = useState('plats');
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [itemQuantity, setItemQuantity] = useState(1);

    const openItemModal = (item: MenuItem) => {
        setSelectedItem(item);
        setItemQuantity(1);
    };

    const closeItemModal = () => {
        setSelectedItem(null);
        setItemQuantity(1);
    };

    const addToCartFromModal = () => {
        if (!selectedItem) return;

        const existingItem = cart.find(cartItem => cartItem.name === selectedItem.name);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.name === selectedItem.name
                    ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...selectedItem, quantity: itemQuantity }]);
        }
        closeItemModal();
    };

    const updateQuantity = (name: string, delta: number) => {
        setCart(cart.map(item =>
            item.name === name
                ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                : item
        ).filter(item => item.quantity > 0));
    };

    const removeFromCart = (name: string) => {
        setCart(cart.filter(item => item.name !== name));
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handleCheckout = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/checkout');
    };

    const groupedMenuItems = menuItems.reduce((acc: { [key: string]: typeof menuItems }, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const groupedDrinks = drinks.reduce((acc: { [key: string]: typeof drinks }, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const currentItems = activeTab === 'plats' ? groupedMenuItems : groupedDrinks;

    return (
        <div className="min-h-screen bg-cream-light text-dark">
            {/* HERO */}
            <div className="relative w-full h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden">

                {/* Background */}
                <img
                    src="orders.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

                {/* Top Bar */}
                <div className="absolute top-0 left-0 w-full z-20">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-white hover:text-gold transition-colors"
                        >
                            <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                <ArrowLeft className="w-5 h-5" />
                            </div>

                            <span className="hidden md:block text-sm tracking-wide uppercase">
                                Retour
                            </span>
                        </button>

                        {/* Cart Button */}
                        <button
                            type="button"
                            onClick={() => setShowCart(true)}
                            className="relative bg-amber-600/90 backdrop-blur-md hover:bg-amber-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-xl"
                        >
                            <ShoppingCart className="w-5 h-5" />

                            <span className="font-semibold">
                                Panier
                            </span>

                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4">

                    <p className="text-cream/60 text-xs tracking-[0.4em] uppercase mb-4">
                        Lounge le 31
                    </p>

                    <h1 className="text-6xl md:text-8xl font-display text-gold leading-none mb-3">
                        NOTRE
                    </h1>

                    <h1 className="text-6xl md:text-8xl font-display text-cream leading-none">
                        MENU
                    </h1>

                    <p className="text-cream/70 text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
                        Découvrez nos plats et boissons exclusifs à commander en ligne
                    </p>

                </div>
            </div>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex space-x-4 border-b border-amber-500/20">
                    <button
                        type="button"
                        onClick={() => setActiveTab('plats')}
                        className={`pb-4 px-6 font-semibold flex items-center space-x-2 transition-all ${activeTab === 'plats'
                            ? 'text-dark border-b-2 border-amber-400'
                            : 'text-dark/60 hover:text-amber-200'
                            }`}
                    >
                        <ChefHat className="w-5 h-5" />
                        <span>Plats</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('boissons')}
                        className={`pb-4 px-6 font-semibold flex items-center space-x-2 transition-all ${activeTab === 'boissons'
                            ? 'text-dark border-b-2 border-amber-400'
                            : 'text-dark/60 hover:text-amber-200'
                            }`}
                    >
                        <Wine className="w-5 h-5" />
                        <span>Boissons</span>
                    </button>
                </div>
            </div>

            {/* Menu Items */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                {Object.entries(currentItems).map(([category, items]) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-3xl font-display text-dark mb-6 border-b border-amber-500/30 pb-3">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {items.map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => openItemModal(item)}
                                    className="bg-cream-light backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all hover:shadow-xl hover:shadow-amber-500/10 flex gap-4 cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-serif text-dark flex-1">{item.name}</h3>
                                        </div>
                                        <p className="text-dark text-sm mb-2 leading-relaxed line-clamp-2">{item.description}</p>
                                        <span className="text-dark font-bold text-lg">{item.price}€</span>
                                    </div>
                                    <div className="w-30 h-32 flex-shrink-0">
                                        <img
                                            src={item.image || 'placeholder.jpg'}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="relative">
                            <img
                                src={selectedItem.image || 'placeholder.jpg'}
                                alt={selectedItem.name}
                                className="w-full h-64 object-cover rounded-t-2xl"
                            />
                            <button
                                type="button"
                                onClick={closeItemModal}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-900 rounded-full p-2 transition-all shadow-lg"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <h2 className="text-2xl font-serif text-dark mb-2">{selectedItem.name}</h2>
                                <p className="text-stone-600 leading-relaxed">{selectedItem.description}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-amber-600">{selectedItem.price}€</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-stone-700 mb-3">Quantité</label>
                                <div className="flex items-center space-x-4 bg-stone-100 rounded-xl p-2 w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                                        className="bg-white text-stone-700 hover:text-amber-600 rounded-lg p-2 transition-all shadow-sm"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-xl font-bold text-stone-900 w-12 text-center">{itemQuantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setItemQuantity(itemQuantity + 1)}
                                        className="bg-white text-stone-700 hover:text-amber-600 rounded-lg p-2 transition-all shadow-sm"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addToCartFromModal}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Ajouter au panier - {(selectedItem.price * itemQuantity).toFixed(2)}€</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            {showCart && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
                    <div className="bg-gold w-full max-w-md h-full overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-cream-light border-b border-amber-500/20 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-serif text-dark">Votre Panier</h2>
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="text-amber-200 hover:text-amber-400 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="w-16 h-16 text-dark/30 mx-auto mb-4" />
                                    <p className="text-amber-200/60">Votre panier est vide</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div
                                                key={item.name}
                                                className="bg-slate-800/50 border border-amber-500/20 rounded-lg p-4"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-dark flex-1 pr-2">{item.name}</h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.name)}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3 bg-slate-700/50 rounded-lg p-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.name, -1)}
                                                            className="text-amber-400 hover:text-amber-300 p-1"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="text-amber-50 font-semibold w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.name, 1)}
                                                            className="text-amber-400 hover:text-amber-300 p-1"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <span className="text-amber-400 font-bold">{item.price * item.quantity}€</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-amber-500/20 pt-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xl font-serif text-dark/50">Total</span>
                                            <span className="text-3xl font-bold text-dark">{getTotal().toFixed(2)}€</span>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-amber-500/50"
                                        >
                                            Commander
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}