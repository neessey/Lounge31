'use client';

import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
const TIME_SLOTS = [
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30'
];

export default function ReservationPage() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const set = (key: keyof typeof form) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement |
                HTMLTextAreaElement |
                HTMLSelectElement
            >
        ) => {
            setForm(f => ({
                ...f,
                [key]: e.target.value
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Une erreur est survenue.');
            }
        } catch {
            setError('Impossible de soumettre la réservation.');
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-cream">

            {/* HERO */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src="/reserv.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <p className="text-cream/60 uppercase tracking-[0.3em] text-xs mb-3">
                        Lounge le 31
                    </p>

                    <h1 className="text-5xl md:text-6xl font-display text-gold">
                        RÉSERVATION
                    </h1>

                    <p className="text-cream/70 mt-4 max-w-lg text-sm">
                        Réservez votre expérience gastronomique exclusive.
                    </p>
                </div>
            </div>
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


                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-4 py-16">

                {success ? (
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-display text-dark mb-3">
                            Réservation envoyée
                        </h2>

                        <p className="text-dark/60 leading-relaxed">
                            Notre équipe vous contactera rapidement pour confirmer votre réservation.
                        </p>
                    </div>
                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6"
                    >

                        <div className="text-center mb-4">
                            <h2 className="text-4xl font-display text-dark mb-3">
                                Réserver une table
                            </h2>

                            <p className="text-dark/60 text-sm">
                                Une expérience culinaire unique vous attend.
                            </p>
                        </div>

                        {/* Nom + Phone */}
                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 text-xs uppercase tracking-widest text-dark/50">
                                    Nom complet
                                </label>

                                <input
                                    required
                                    value={form.name}
                                    onChange={set('name')}
                                    className="w-full border border-dark/10 rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-xs uppercase tracking-widest text-dark/50">
                                    Téléphone
                                </label>

                                <input
                                    required
                                    value={form.phone}
                                    onChange={set('phone')}
                                    className="w-full border border-dark/10 rounded-xl px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-xs uppercase tracking-widest text-dark/50">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={set('email')}
                                className="w-full border border-dark/10 rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Date / Heure / Pers */}
                        <div className="grid md:grid-cols-3 gap-5">

                            <input
                                type="date"
                                required
                                min={minDateStr}
                                value={form.date}
                                onChange={set('date')}
                                className="border border-dark/10 rounded-xl px-4 py-3"
                            />

                            <select
                                required
                                value={form.time}
                                onChange={set('time')}
                                className="border border-dark/10 rounded-xl px-4 py-3"
                            >
                                <option value="">Heure</option>

                                {TIME_SLOTS.map(t => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={form.guests}
                                onChange={set('guests')}
                                className="border border-dark/10 rounded-xl px-4 py-3"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                    <option key={n} value={n}>
                                        {n} pers.
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Message */}
                        <textarea
                            rows={4}
                            value={form.message}
                            onChange={set('message')}
                            placeholder="Demandes particulières..."
                            className="w-full border border-dark/10 rounded-xl px-4 py-3 resize-none"
                        />

                        {error && (
                            <p className="text-red-500 text-sm">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-dark text-cream py-4 rounded-full hover:bg-dark-green transition-colors"
                        >
                            {loading ? 'Envoi...' : 'Réserver maintenant'}
                        </button>

                    </form>
                )}
            </div>
        </div>
    );
}