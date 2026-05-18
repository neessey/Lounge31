import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        return NextResponse.json({ error: 'ADMIN_PASSWORD non configuré.' }, { status: 500 });
    }

    if (password !== adminPassword) {
        return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', process.env.ADMIN_SECRET || 'secret', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
}