'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CartItem = {
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
};

export default function RestaurantCheckout() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    useEffect(() => {
        // Récupérer le panier depuis localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const updateQuantity = (name: string, delta: number) => {
        const updatedCart = cart.map(item =>
            item.name === name
                ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                : item
        ).filter(item => item.quantity > 0);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (name: string) => {
        const updatedCart = cart.filter(item => item.name !== name);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getSubtotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getTax = () => {
        return getSubtotal() * 0.075; // 7.5% de taxes
    };

    const getTotal = () => {
        return getSubtotal() + getTax();
    };

    const getCartCount = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handleGoBack = () => {
        router.push('/orders');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
            <header className="relative bg-gold top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-32 h-auto">
                                <img src="logo.png" alt="" />
                            </div>
                        </div>
                        <div className="relative bg-amber-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-semibold">{getCartCount()} articles</span>
                        </div>
                    </div>
                </div>
            </header>

            <button
                onClick={handleGoBack}
                className="max-w-2xl mx-auto px-4 pt-3 block"
            >
                <div className="flex items-center space-x-2">
                    <ChevronLeft className="w-5 h-5 text-stone-600" />
                    <div className="text-stone-900 font-display text-lg">
                        <h1>Retour</h1>
                    </div>
                </div>
            </button>

            <div className="max-w-2xl mx-auto px-4 py-6">
                {/* Map Section */}
                <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
                    <div className="relative h-48 bg-stone-200">
                        <a href="https://www.google.com/maps/search/?api=1&query=Restaurant+Lounge+Le+31+Bietry+Abidjan" target="_blank">
                            <img src="map.jpg" alt="Localisation Restaurant Lounge Le 31"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-stone-300 flex items-center justify-center"><MapPin class="w-16 h-16 text-stone-400" /></div>';
                                }}
                            />
                        </a>
                    </div>
                </div>

                {/* Pickup Info */}
                <div className="bg-white rounded-xl shadow-sm mb-4 p-4">
                    <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-stone-600 mt-1" />
                        <div>
                            <div className="font-semibold text-stone-900">Restaurant Lounge Le 31 Bietry</div>
                            <div className="text-sm text-stone-500">Abidjan, Côte d'Ivoire</div>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-xl shadow-sm mb-4">
                    <button
                        onClick={() => setShowOrderDetails(!showOrderDetails)}
                        className="w-full p-4 flex items-center justify-between text-left"
                    >
                        <span className="font-semibold text-stone-900">
                            Détails de la commande ({getCartCount()})
                        </span>
                        <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${showOrderDetails ? 'rotate-180' : ''}`} />
                    </button>

                    {showOrderDetails && (
                        <div className="px-4 pb-4 space-y-3 border-t border-stone-200 pt-4">
                            {cart.map((item) => (
                                <div key={item.name} className="flex items-start justify-between space-x-3 pb-3 border-b border-stone-100 last:border-0">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-stone-900">{item.name}</h4>
                                        <p className="text-xs text-stone-500 mt-1">{item.description}</p>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <div className="flex items-center space-x-2 bg-stone-100 rounded-lg p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.name, -1)}
                                                    className="text-stone-600 hover:text-stone-900 p-1"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-stone-900 font-semibold text-sm w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.name, 1)}
                                                    className="text-stone-600 hover:text-stone-900 p-1"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.name)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-stone-900">
                                            {(item.price * item.quantity).toFixed(2)}€
                                        </div>
                                        <div className="text-xs text-stone-500">
                                            {item.price}€ × {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Payment Section */}
                <div className="bg-white rounded-xl shadow-sm mb-4 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-stone-900">Payment</h2>
                        <div className="flex space-x-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" alt="Discover" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6" />
                        </div>
                    </div>

                    {/* Payment Methods Selection */}
                    <div className="space-y-3 mb-4">
                        {/* Card Payment */}
                        <label className="flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-stone-50"
                            style={{ borderColor: paymentMethod === 'card' ? '#d97706' : '#d6d3d1' }}>
                            <div className="flex items-center justify-center">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-amber-600' : 'border-stone-300'}`}>
                                    {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-amber-600"></div>}
                                </div>
                            </div>
                            <div className="w-10 h-10">
                                <img src="cb.png" alt="" />
                            </div>
                            <span className="text-stone-900 font-medium">Carte bancaire</span>
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="sr-only"
                            />
                        </label>

                        {/* Mobile Money */}
                        <label className="flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-stone-50"
                            style={{ borderColor: paymentMethod === 'mobilemoney' ? '#d97706' : '#d6d3d1' }}>
                            <div className="flex items-center justify-center">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'mobilemoney' ? 'border-amber-600' : 'border-stone-300'}`}>
                                    {paymentMethod === 'mobilemoney' && <div className="w-3 h-3 rounded-full bg-amber-600"></div>}
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16zM12 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                            <span className="text-stone-900 font-medium">Mobile Money</span>
                            <input
                                type="radio"
                                name="payment"
                                value="mobilemoney"
                                checked={paymentMethod === 'mobilemoney'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="sr-only"
                            />
                        </label>

                        {/* Wave */}
                        <label className="flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-stone-50"
                            style={{ borderColor: paymentMethod === 'wave' ? '#d97706' : '#d6d3d1' }}>
                            <div className="flex items-center justify-center">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wave' ? 'border-amber-600' : 'border-stone-300'}`}>
                                    {paymentMethod === 'wave' && <div className="w-3 h-3 rounded-full bg-amber-600"></div>}
                                </div>
                            </div>
                            <div className="w-10 h-10">
                                <img src="wave-.png" alt="" />
                            </div>
                            <span className="text-stone-900 font-medium">Wave</span>
                            <input
                                type="radio"
                                name="payment"
                                value="wave"
                                checked={paymentMethod === 'wave'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="sr-only"
                            />
                        </label>
                    </div>

                    {/* Card Form */}
                    {paymentMethod === 'card' && (
                        <div className="space-y-3 animate-fadeIn">
                            <input
                                type="text"
                                placeholder="Card number *"
                                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Expiration date *"
                                    className="px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Security code *"
                                    className="px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Zip code *"
                                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    )}

                    {/* Mobile Money Form */}
                    {paymentMethod === 'mobilemoney' && (
                        <div className="space-y-3 animate-fadeIn">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">Opérateur</label>
                                <select className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                                    <option>Orange Money</option>
                                    <option>MTN Mobile Money</option>
                                    <option>Moov Money</option>
                                    <option>Airtel Money</option>
                                </select>
                            </div>
                            <input
                                type="tel"
                                placeholder="Numéro de téléphone *"
                                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                <p className="text-sm text-blue-800">
                                    💡 Vous recevrez une notification sur votre téléphone pour valider le paiement.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Wave Form */}
                    {paymentMethod === 'wave' && (
                        <div className="space-y-3 animate-fadeIn">
                            <input
                                type="tel"
                                placeholder="Numéro Wave *"
                                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                <p className="text-sm text-blue-800">
                                    💡 Ouvrez votre application Wave pour confirmer le paiement.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10">
                                    <img src="wave.jpg" alt="" />
                                </div>
                                <div className="text-sm text-stone-600">
                                    <div className="font-semibold">Paiement sécurisé avec Wave</div>
                                    <div className="text-xs">Sans frais supplémentaires</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Total */}
                <div className="bg-white rounded-xl shadow-sm mb-4 p-4">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-stone-700">
                            <span>Sous-total</span>
                            <span>{getSubtotal().toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between text-stone-700">
                            <span>Taxes (7.5%)</span>
                            <span>{getTax().toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between font-semibold text-stone-900 text-lg pt-2 border-t border-stone-200">
                            <span>Total</span>
                            <span>{getTotal().toFixed(2)}€</span>
                        </div>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cart.length === 0}
                >
                    Passer la commande
                </button>

                <p className="text-xs text-stone-500 text-center mt-4 px-4">
                    En finalisant votre commande, vous acceptez de recevoir des messages informatifs du restaurant (mises à jour de commande et reçus numériques).
                </p>
            </div>
        </div>
    );
}