import { sql } from '@vercel/postgres';

export async function initDatabase() {
  try {
    // Users table with role
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'member',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        image_url TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Site Settings table (Key-Value)
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;

    // Default settings if not exists
    await sql`INSERT INTO site_settings (key, value) VALUES ('site_name', '64SHOP') ON CONFLICT DO NOTHING;`;
    await sql`INSERT INTO site_settings (key, value) VALUES ('primary_color', 'blue') ON CONFLICT DO NOTHING;`;
    await sql`INSERT INTO site_settings (key, value) VALUES ('hero_title', '64SHOP') ON CONFLICT DO NOTHING;`;
    await sql`INSERT INTO site_settings (key, value) VALUES ('hero_subtitle', 'FIVEM CHEAT CHEAP') ON CONFLICT DO NOTHING;`;
    await sql`INSERT INTO site_settings (key, value) VALUES ('hero_description', 'โปรแกรมช่วยเล่น FiveM คุณภาพดี ราคาถูก ใช้งานได้ทุกเซิฟเวอร์') ON CONFLICT DO NOTHING;`;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
