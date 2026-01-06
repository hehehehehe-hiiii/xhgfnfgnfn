import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await sql`SELECT key, value FROM site_settings;`;
        const settings = result.rows.reduce((acc: any, row: any) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Simplified: update multiple settings
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                await sql`
                    INSERT INTO site_settings (key, value) 
                    VALUES (${key}, ${value as any})
                    ON CONFLICT (key) DO UPDATE SET value = ${value as any};
                `;
            }
        }
        return NextResponse.json({ message: 'Settings updated' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
