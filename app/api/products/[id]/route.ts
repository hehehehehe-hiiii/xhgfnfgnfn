import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, price, description, image_url, category } = await request.json();
        const result = await sql`
      UPDATE products 
      SET name = ${name}, price = ${price}, description = ${description}, image_url = ${image_url}, category = ${category}
      WHERE id = ${id}
      RETURNING *;
    `;
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await sql`DELETE FROM products WHERE id = ${id};`;
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
