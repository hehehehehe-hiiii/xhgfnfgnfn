import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { initDatabase } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Initialize database if not already
        await initDatabase();

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await sql`
        INSERT INTO users (username, password, role)
        VALUES (${username}, ${hashedPassword}, 'member')
        RETURNING id, username, role;
      `;
            return NextResponse.json({ user: result.rows[0] });
        } catch (dbError: any) {
            if (dbError.code === '23505') { // Unique violation
                return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
            }
            throw dbError;
        }

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
