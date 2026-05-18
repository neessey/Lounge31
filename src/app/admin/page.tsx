'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus, Pencil, Trash2, ChefHat, Wine, Calendar, LogOut, Check, Clock, XCircle } from 'lucide-react';

type Reservation = {
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    message?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
};

type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    type: 'food' | 'drink';
    image?: string;
};

type Tab = 'reservations' | 'menu';

const statusConfig = {
    pending: { label: 'En attente', color: 'text-yellow-500', bg: 'bg-yellow-500/10', Icon: Clock },
    confirmed: { label: 'Confirmée', color: 'text-green-400', bg: 'bg-green-400/10', Icon: Check },
    cancelled: { label: 'Annulée', color: 'text-red-400', bg: 'bg-red-400/10', Icon: XCircle },
};

const FOOD_CATEGORIES = ['Entrées', 'Plats', 'Desserts'];
const DRINK_CATEGORIES = ['Apéritifs', 'Vins Blancs', 'Vins Rouges', 'Champagnes'];

// ── Small Components ───────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="bg-cream/5 border border-cream/10 rounded-lg p-5">
            <p className="text-cream/40 text-xs uppercase tracking-widest mb-2">{label}</p>
            <p className="text-3xl font-display text-gold">{value}</p>
            {sub && <p className="text-cream/40 text-xs mt-1">{sub}</p>}
        </div>
    );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>('reservations');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Menu form state
    const [showMenuForm, setShowMenuForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [menuForm, setMenuForm] = useState<Omit<MenuItem, 'id'>>({
        name: '', description: '', price: 0, category: 'Entrées', type: 'food', image: '',
    });
    const [menuFilter, setMenuFilter] = useState<'all' | 'food' | 'drink'>('all');

    const fetchData = useCallback(async () => {
        setLoading(true);
        const [resRes, menuRes] = await Promise.all([
            fetch('/api/reservations'),
            fetch('/api/menu'),
        ]);
        if (resRes.status === 401) { router.push('/admin/login'); return; }
        setReservations(await resRes.json());
        setMenuItems(await menuRes.json());
        setLoading(false);
    }, [router]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ── Reservation Actions ──────────────────────────────────────────────

    const updateStatus = async (id: string, status: Reservation['status']) => {
        await fetch('/api/reservations', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status }),
        });
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const deleteReservation = async (id: string) => {
        if (!confirm('Supprimer cette réservation ?')) return;
        await fetch('/api/reservations', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setReservations(prev => prev.filter(r => r.id !== id));
    };

    // ── Menu Actions ─────────────────────────────────────────────────────

    const openAddMenu = () => {
        setEditingItem(null);
        setMenuForm({ name: '', description: '', price: 0, category: 'Entrées', type: 'food', image: '' });
        setShowMenuForm(true);
    };

    const openEditMenu = (item: MenuItem) => {
        setEditingItem(item);
        setMenuForm({ name: item.name, description: item.description, price: item.price, category: item.category, type: item.type, image: item.image || '' });
        setShowMenuForm(true);
    };

    const saveMenuItem = async () => {
        if (!menuForm.name || !menuForm.description || !menuForm.price) return;
        if (editingItem) {
            await fetch('/api/menu', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingItem.id, ...menuForm }),
            });
            setMenuItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...menuForm } : i));
        } else {
            const res = await fetch('/api/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menuForm),
            });
            const newItem = await res.json();
            setMenuItems(prev => [...prev, newItem]);
        }
        setShowMenuForm(false);
    };

    const deleteMenuItem = async (id: string) => {
        if (!confirm('Supprimer cet élément du menu ?')) return;
        await fetch('/api/menu', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setMenuItems(prev => prev.filter(i => i.id !== id));
    };

    const logout = async () => {
        await fetch('/api/auth', { method: 'DELETE' });
        router.push('/admin/login');
    };

    // ── Stats ────────────────────────────────────────────────────────────

    const pending = reservations.filter(r => r.status === 'pending').length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const today = reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length;
    const filteredMenu = menuItems.filter(i => menuFilter === 'all' || i.type === menuFilter);
    const groupedMenu = filteredMenu.reduce((acc: Record<string, MenuItem[]>, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // ── Render ────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-dark-green text-cream">

            {/* Top Bar */}
            <header className="border-b border-cream/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-cream/40 text-xs tracking-widest uppercase">Admin</p>
                        <h1 className="text-xl font-display text-gold leading-tight">LOUNGE LE 31</h1>
                    </div>
                    {/* Nav */}
                    <nav className="ml-8 flex gap-1">
                        {([
                            { key: 'reservations', label: 'Réservations', Icon: Calendar },
                            { key: 'menu', label: 'Menu', Icon: ChefHat },
                        ] as const).map(({ key, label, Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${tab === key
                                        ? 'bg-gold text-dark font-medium'
                                        : 'text-cream/50 hover:text-cream'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-cream/40 hover:text-cream text-sm transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">

                {loading ? (
                    <div className="text-center py-20 text-cream/30 text-sm">Chargement…</div>
                ) : (

                    // ── RESERVATIONS ─────────────────────────────────────────────
                    tab === 'reservations' ? (
                        <div>
                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                <StatCard label="Total" value={reservations.length} />
                                <StatCard label="En attente" value={pending} />
                                <StatCard label="Confirmées" value={confirmed} />
                                <StatCard label="Aujourd'hui" value={today} sub="réservations" />
                            </div>

                            {/* List */}
                            {reservations.length === 0 ? (
                                <div className="text-center py-20 text-cream/30">
                                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Aucune réservation pour l'instant</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {reservations.map(r => {
                                        const cfg = statusConfig[r.status];
                                        return (
                                            <div key={r.id} className="bg-cream/5 border border-cream/10 rounded-lg p-5 hover:border-cream/20 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    {/* Info */}
                                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        <div>
                                                            <p className="text-cream/40 text-xs uppercase tracking-wide mb-0.5">Client</p>
                                                            <p className="text-cream text-sm font-medium">{r.name}</p>
                                                            <p className="text-cream/50 text-xs">{r.phone}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-cream/40 text-xs uppercase tracking-wide mb-0.5">Date & heure</p>
                                                            <p className="text-cream text-sm font-medium">
                                                                {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                            </p>
                                                            <p className="text-cream/50 text-xs">{r.time}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-cream/40 text-xs uppercase tracking-wide mb-0.5">Couverts</p>
                                                            <p className="text-cream text-sm font-medium">{r.guests} pers.</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-cream/40 text-xs uppercase tracking-wide mb-0.5">Statut</p>
                                                            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${cfg.color} ${cfg.bg}`}>
                                                                <cfg.Icon className="w-3 h-3" />
                                                                {cfg.label}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        {r.status !== 'confirmed' && (
                                                            <button
                                                                onClick={() => updateStatus(r.id, 'confirmed')}
                                                                className="p-2 rounded-full border border-green-500/30 text-green-400 hover:bg-green-400/10 transition-colors"
                                                                title="Confirmer"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        {r.status !== 'cancelled' && (
                                                            <button
                                                                onClick={() => updateStatus(r.id, 'cancelled')}
                                                                className="p-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-400/10 transition-colors"
                                                                title="Annuler"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteReservation(r.id)}
                                                            className="p-2 rounded-full border border-cream/10 text-cream/30 hover:text-cream/60 hover:border-cream/30 transition-colors"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                {r.message && (
                                                    <p className="mt-3 pt-3 border-t border-cream/10 text-cream/50 text-xs italic">
                                                        "{r.message}"
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    ) : (

                        // ── MENU ──────────────────────────────────────────────────
                        <div>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex gap-2">
                                    {([
                                        { key: 'all', label: 'Tout' },
                                        { key: 'food', label: 'Plats' },
                                        { key: 'drink', label: 'Boissons' },
                                    ] as const).map(({ key, label }) => (
                                        <button
                                            key={key}
                                            onClick={() => setMenuFilter(key)}
                                            className={`px-4 py-1.5 rounded-full text-xs transition-colors ${menuFilter === key
                                                    ? 'bg-gold text-dark font-medium'
                                                    : 'border border-cream/20 text-cream/50 hover:text-cream'
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={openAddMenu}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gold text-dark text-sm font-medium rounded-full hover:bg-gold-light transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Ajouter un plat
                                </button>
                            </div>

                            {/* Grouped menu */}
                            {Object.entries(groupedMenu).map(([category, items]) => (
                                <div key={category} className="mb-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-lg font-display text-cream">{category}</h3>
                                        <div className="flex-1 h-px bg-cream/10" />
                                        <span className="text-cream/30 text-xs">{items.length} article{items.length > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {items.map(item => (
                                            <div key={item.id} className="bg-cream/5 border border-cream/10 rounded-lg p-4 flex gap-3 hover:border-cream/20 transition-colors">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="text-cream text-sm font-medium leading-snug">{item.name}</p>
                                                        <span className="text-gold font-display text-base flex-shrink-0">{item.price}€</span>
                                                    </div>
                                                    <p className="text-cream/40 text-xs mt-1 line-clamp-2">{item.description}</p>
                                                </div>
                                                <div className="flex flex-col gap-1 flex-shrink-0">
                                                    <button
                                                        onClick={() => openEditMenu(item)}
                                                        className="p-1.5 text-cream/30 hover:text-gold transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteMenuItem(item.id)}
                                                        className="p-1.5 text-cream/30 hover:text-red-400 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredMenu.length === 0 && (
                                <div className="text-center py-20 text-cream/30">
                                    <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">Aucun article dans cette catégorie</p>
                                </div>
                            )}
                        </div>
                    )
                )}
            </main>

            {/* ── Menu Form Modal ── */}
            {showMenuForm && (
                <div
                    className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowMenuForm(false)}
                >
                    <div
                        className="bg-dark-green border border-cream/10 rounded-lg w-full max-w-lg shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
                            <h2 className="font-display text-cream text-lg">
                                {editingItem ? 'Modifier le plat' : 'Ajouter au menu'}
                            </h2>
                            <button onClick={() => setShowMenuForm(false)} className="text-cream/30 hover:text-cream transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Type toggle */}
                            <div>
                                <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Type</label>
                                <div className="flex gap-2">
                                    {(['food', 'drink'] as const).map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => {
                                                setMenuForm(f => ({
                                                    ...f,
                                                    type: t,
                                                    category: t === 'food' ? 'Entrées' : 'Apéritifs',
                                                }));
                                            }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-colors ${menuForm.type === t
                                                    ? 'bg-gold text-dark font-medium'
                                                    : 'border border-cream/20 text-cream/50 hover:text-cream'
                                                }`}
                                        >
                                            {t === 'food' ? <ChefHat className="w-3.5 h-3.5" /> : <Wine className="w-3.5 h-3.5" />}
                                            {t === 'food' ? 'Plat' : 'Boisson'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Nom</label>
                                <input
                                    value={menuForm.name}
                                    onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="Nom du plat"
                                    className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-2.5 placeholder:text-cream/20 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    value={menuForm.description}
                                    onChange={e => setMenuForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Description du plat…"
                                    rows={2}
                                    className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-2.5 placeholder:text-cream/20 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                                />
                            </div>

                            {/* Price + Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Prix (€)</label>
                                    <input
                                        type="number"
                                        value={menuForm.price || ''}
                                        onChange={e => setMenuForm(f => ({ ...f, price: Number(e.target.value) }))}
                                        placeholder="0"
                                        min="0"
                                        className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-2.5 placeholder:text-cream/20 focus:outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Catégorie</label>
                                    <select
                                        value={menuForm.category}
                                        onChange={e => setMenuForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-gold/40 transition-colors"
                                    >
                                        {(menuForm.type === 'food' ? FOOD_CATEGORIES : DRINK_CATEGORIES).map(c => (
                                            <option key={c} value={c} className="bg-dark-green">{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Image (nom du fichier)</label>
                                <input
                                    value={menuForm.image || ''}
                                    onChange={e => setMenuForm(f => ({ ...f, image: e.target.value }))}
                                    placeholder="photo.jpg"
                                    className="w-full bg-cream/5 border border-cream/20 text-cream text-sm rounded-lg px-4 py-2.5 placeholder:text-cream/20 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex gap-3">
                            <button
                                onClick={() => setShowMenuForm(false)}
                                className="flex-1 px-6 py-3 border border-cream/20 text-cream/60 text-sm rounded-full hover:border-cream/40 hover:text-cream transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={saveMenuItem}
                                className="flex-1 px-6 py-3 bg-gold text-dark text-sm font-medium rounded-full hover:bg-gold-light transition-colors"
                            >
                                {editingItem ? 'Enregistrer' : 'Ajouter'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}