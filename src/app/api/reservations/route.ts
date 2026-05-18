import { NextRequest, NextResponse } from 'next/server';
import { addReservation, getReservations, updateReservationStatus, deleteReservation } from '@/lib/data';

// ── Email via Resend ───────────────────────────────────────────────────────

async function sendEmailNotification(reservation: Awaited<ReturnType<typeof addReservation>>) {
    const apiKey = process.env.RESEND_API_KEY;
    const restaurantEmail = process.env.RESTAURANT_EMAIL || 'contact@loungele31.com';

    if (!apiKey) {
        console.warn('[Resend] RESEND_API_KEY not set — skipping email.');
        return;
    }

    const statusLabels = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée' };

    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            from: 'Lounge le 31 <noreply@loungele31.com>',
            to: [restaurantEmail],
            subject: `🍽️ Nouvelle réservation — ${reservation.name} (${reservation.date} à ${reservation.time})`,
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 40px;">
                    <div style="background: #1a2e1a; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h1 style="color: #c9a84c; font-size: 24px; margin: 0; letter-spacing: 3px;">LOUNGE LE 31</h1>
                        <p style="color: rgba(245,240,232,0.6); font-size: 11px; letter-spacing: 2px; margin: 8px 0 0;">NOUVELLE RÉSERVATION</p>
                    </div>
                    <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Client</td>
                                <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600;">${reservation.name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                                <td style="padding: 12px 0; color: #1a1a1a;"><a href="mailto:${reservation.email}" style="color: #c9a84c;">${reservation.email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
                                <td style="padding: 12px 0; color: #1a1a1a;"><a href="tel:${reservation.phone}" style="color: #c9a84c;">${reservation.phone}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
                                <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600;">${new Date(reservation.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Heure</td>
                                <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600;">${reservation.time}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Couverts</td>
                                <td style="padding: 12px 0; color: #1a1a1a; font-weight: 600;">${reservation.guests} personne${reservation.guests > 1 ? 's' : ''}</td>
                            </tr>
                            ${reservation.message ? `
                            <tr>
                                <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
                                <td style="padding: 12px 0; color: #555; font-style: italic;">${reservation.message}</td>
                            </tr>` : ''}
                        </table>
                        <div style="margin-top: 24px; padding: 16px; background: #f5f0e8; border-radius: 8px; text-align: center;">
                            <p style="color: #666; font-size: 12px; margin: 0;">Gérez cette réservation depuis votre <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color: #c9a84c; font-weight: 600;">tableau de bord admin</a></p>
                        </div>
                    </div>
                </div>
            `,
        }),
    });
}

// ── Handlers ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
    // Protected: only admin can read list
    const session = req.cookies.get('admin_session')?.value;
    if (session !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(getReservations());
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, date, time, guests, message } = body;

        if (!name || !email || !phone || !date || !time || !guests) {
            return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
        }

        const reservation = addReservation({ name, email, phone, date, time, guests: Number(guests), message });

        // Send email (non-blocking — don't fail the request if email fails)
        sendEmailNotification(reservation).catch(err =>
            console.error('[Email] Failed to send notification:', err)
        );

        return NextResponse.json({ success: true, id: reservation.id }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id, status } = await req.json();
    const ok = updateReservationStatus(id, status);
    return NextResponse.json({ success: ok });
}

export async function DELETE(req: NextRequest) {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await req.json();
    const ok = deleteReservation(id);
    return NextResponse.json({ success: ok });
}