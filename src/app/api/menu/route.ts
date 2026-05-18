import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '@/lib/data';

function isAdmin(req: NextRequest) {
    return req.cookies.get('admin_session')?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
    return NextResponse.json(getMenuItems());
}

export async function POST(req: NextRequest) {
    if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { name, description, price, category, type, image } = body;
    if (!name || !description || !price || !category || !type) {
        return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
    }
    const item = addMenuItem({ name, description, price: Number(price), category, type, image });
    return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
    if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id, ...data } = await req.json();
    const ok = updateMenuItem(id, data);
    return NextResponse.json({ success: ok });
}

export async function DELETE(req: NextRequest) {
    if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await req.json();
    const ok = deleteMenuItem(id);
    return NextResponse.json({ success: ok });
}