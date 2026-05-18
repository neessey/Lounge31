import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON<T>(filename: string, defaultValue: T): T {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return defaultValue;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return defaultValue;
    }
}

function writeJSON<T>(filename: string, data: T): void {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ── Types ──────────────────────────────────────────────────────────────────

export type Reservation = {
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

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    type: 'food' | 'drink';
    image?: string;
};

// ── Reservations ──────────────────────────────────────────────────────────

export function getReservations(): Reservation[] {
    return readJSON<Reservation[]>('reservations.json', []);
}

export function addReservation(data: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Reservation {
    const reservations = getReservations();
    const newReservation: Reservation = {
        ...data,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
    reservations.unshift(newReservation);
    writeJSON('reservations.json', reservations);
    return newReservation;
}

export function updateReservationStatus(id: string, status: Reservation['status']): boolean {
    const reservations = getReservations();
    const idx = reservations.findIndex(r => r.id === id);
    if (idx === -1) return false;
    reservations[idx].status = status;
    writeJSON('reservations.json', reservations);
    return true;
}

export function deleteReservation(id: string): boolean {
    const reservations = getReservations();
    const filtered = reservations.filter(r => r.id !== id);
    if (filtered.length === reservations.length) return false;
    writeJSON('reservations.json', filtered);
    return true;
}

// ── Menu Items ────────────────────────────────────────────────────────────

const DEFAULT_MENU: MenuItem[] = [
    { id: '1', name: 'Macaron Hibiscus & Foie Gras', description: 'Un macaron aux saveurs exotiques de hibiscus et de foie gras.', price: 18, category: 'Entrées', type: 'food', image: 'mac.png' },
    { id: '2', name: 'Duo de Gambas Nacrées & Escabèche', description: 'Gambas juteuses accompagnées de sa verveine Mélisse.', price: 24, category: 'Entrées', type: 'food', image: 'gam.png' },
    { id: '3', name: "Pistris Rôti, caviar d'Aquitaine", description: 'Consommé de Vodka fumée et Shimeji.', price: 38, category: 'Plats', type: 'food', image: 'cav.png' },
    { id: '4', name: 'Magret de Canard, autour de la betterave rouge', description: 'Magret de Canard rôti, chips de betterave.', price: 32, category: 'Plats', type: 'food', image: 'can.png' },
    { id: '5', name: 'Dos de Cerf, basse température', description: 'Accompagné de son jus court, déclinaison de courge.', price: 42, category: 'Plats', type: 'food', image: 'dos.png' },
    { id: '6', name: 'Poire Pochée', description: 'Nappage Fruit Rouge et Gelée de Champagne.', price: 14, category: 'Desserts', type: 'food', image: 'poi.png' },
    { id: '7', name: 'Douceur de Guimauve autour du Cèpe', description: 'Guimauve aux saveurs terreuses du cèpe.', price: 16, category: 'Desserts', type: 'food', image: 'gim.png' },
    { id: '8', name: 'La tête tourne autour du Cigare', description: 'Sphère de chocolat, crème cigare.', price: 15, category: 'Desserts', type: 'food' },
    { id: '9', name: "Ratafia d'Alsace", description: 'Délicieux liqueur d\'Alsace.', price: 12, category: 'Apéritifs', type: 'drink' },
    { id: '10', name: 'Montagny Les Buis – Bourgogne Blanc', description: 'Vin blanc équilibré et lumineux.', price: 45, category: 'Vins Blancs', type: 'drink' },
    { id: '11', name: 'Blanc de Blancs – Laurent-Perrier', description: 'Champagne d\'une grande pureté.', price: 85, category: 'Champagnes', type: 'drink' },
    { id: '12', name: 'Champagne Sous Bois – Billecart-Salmon', description: 'Champagne rare et complexe, vinifié sous bois.', price: 120, category: 'Champagnes', type: 'drink' },
];

export function getMenuItems(): MenuItem[] {
    return readJSON<MenuItem[]>('menu.json', DEFAULT_MENU);
}

export function addMenuItem(data: Omit<MenuItem, 'id'>): MenuItem {
    const items = getMenuItems();
    const newItem: MenuItem = { ...data, id: Date.now().toString() };
    items.push(newItem);
    writeJSON('menu.json', items);
    return newItem;
}

export function updateMenuItem(id: string, data: Partial<Omit<MenuItem, 'id'>>): boolean {
    const items = getMenuItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...data };
    writeJSON('menu.json', items);
    return true;
}

export function deleteMenuItem(id: string): boolean {
    const items = getMenuItems();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    writeJSON('menu.json', filtered);
    return true;
}