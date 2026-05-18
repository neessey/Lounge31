'use client';
import { useState } from 'react';
import { X, Check } from 'lucide-react';

type Props = {
    isOpen: boolean;
    onCloseAction: () => void;
};

const TIME_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];

export default function ReservationModal({ isOpen, onCloseAction }: Props) {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const set = (key: keyof typeof form) => (
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(f => ({ ...f, [key]: e.target.value }))
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Une erreur est survenue.');
            }
        } catch {
            setError('Impossible de soumettre la réservation. Réessayez.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuccess(false);
        setError('');
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
        onCloseAction();
    };

    // Minimum date = tomorrow
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <div
                className="bg-cream w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-dark-green px-6 py-5 flex items-center justify-between rounded-t-lg">
                    <div>
                        <p className="text-cream/40 text-xs tracking-widest uppercase mb-0.5">Lounge le 31</p>
                        <h2 className="text-xl font-display text-gold leading-tight">RÉSERVER UNE TABLE</h2>
                    </div>
                    <button onClick={handleClose} className="text-cream/40 hover:text-cream transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {success ? (
                    /* Success state */
                    <div className="p-10 text-center">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Check className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-display text-dark mb-2">Demande envoyée !</h3>
                        <p className="text-dark/60 text-sm leading-relaxed mb-6">
                            Nous avons bien reçu votre demande de réservation.<br />
                            Notre équipe vous confirmera par email ou téléphone dans les plus brefs délais.
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-8 py-3 bg-dark text-cream text-sm rounded-full hover:bg-dark-green transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">

                        {/* Name + Phone */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Nom complet *</label>
                                <input
                                    value={form.name} onChange={set('name')} required
                                    placeholder="Jean Dupont"
                                    className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 placeholder:text-dark/20 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Téléphone *</label>
                                <input
                                    value={form.phone} onChange={set('phone')} required
                                    placeholder="+225 07 00 00 00 00"
                                    className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 placeholder:text-dark/20 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Email *</label>
                            <input
                                type="email" value={form.email} onChange={set('email')} required
                                placeholder="jean@exemple.com"
                                className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 placeholder:text-dark/20 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                            />
                        </div>

                        {/* Date + Time + Guests */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Date *</label>
                                <input
                                    type="date" value={form.date} onChange={set('date')} required
                                    min={minDateStr}
                                    className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Heure *</label>
                                <select
                                    value={form.time} onChange={set('time')} required
                                    className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                                >
                                    <option value="">—</option>
                                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Couverts *</label>
                                <select
                                    value={form.guests} onChange={set('guests')} required
                                    className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-dark/40 transition-colors bg-transparent"
                                >
                                    {[1,2,3,4,5,6,7,8].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'pers.' : 'pers.'}</option>
                                    ))}
                                    <option value="9+">9+ pers.</option>
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-dark/50 text-xs uppercase tracking-widest mb-2">Message (optionnel)</label>
                            <textarea
                                value={form.message} onChange={set('message')}
                                placeholder="Allergies, occasion spéciale, demandes particulières…"
                                rows={3}
                                className="w-full border border-dark/15 text-dark text-sm rounded-lg px-4 py-2.5 placeholder:text-dark/20 focus:outline-none focus:border-dark/40 transition-colors bg-transparent resize-none"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs text-center">{error}</p>
                        )}

                        <div className="flex gap-3 pt-1">
                            <button
                                type="button" onClick={handleClose}
                                className="flex-1 px-6 py-3 border border-dark/20 text-dark/60 text-sm rounded-full hover:border-dark/40 hover:text-dark transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit" disabled={loading}
                                className="flex-1 px-6 py-3 bg-dark text-cream text-sm font-medium rounded-full hover:bg-dark-green transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Envoi en cours…' : 'Réserver'}
                            </button>
                        </div>

                        <p className="text-dark/30 text-xs text-center">
                            Votre réservation sera confirmée par notre équipe sous 24h.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}