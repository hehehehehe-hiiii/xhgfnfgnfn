import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await sql`SELECT * FROM products ORDER BY created_at DESC;`;
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, price, description, image_url, category } = await request.json();
        const result = await sql`
      INSERT INTO products (name, price, description, image_url, category)
      VALUES (${name}, ${price}, ${description}, ${image_url}, ${category})
      RETURNING *;
    `;
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
