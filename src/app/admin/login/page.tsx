'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Mot de passe incorrect.');
            }
        } catch {
            setError('Erreur de connexion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-green flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo / Title */}
                <div className="text-center mb-10">
                    <p className="text-cream/40 text-xs tracking-[0.4em] uppercase mb-3">
                        Tableau de bord
                    </p>
                    <h1 className="text-4xl font-display text-gold leading-none mb-1">LOUNGE</h1>
                    <h1 className="text-4xl font-display text-cream leading-none">LE 31</h1>
                </div>

                {/* Form */}
                <div className="bg-cream/5 border border-cream/10 rounded-lg p-8">
                    <p className="text-cream/60 text-sm mb-6 text-center">
                        Accès réservé à l'équipe du restaurant
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-400/80 text-xs text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gold text-dark text-sm font-medium rounded-full hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-6 text-cream/20 text-xs">
                    © 2026 Lounge le 31
                </p>
            </div>
        </div>
    );
}