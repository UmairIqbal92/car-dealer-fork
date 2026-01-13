import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      year INTEGER NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      mileage INTEGER DEFAULT 0,
      color VARCHAR(100),
      body_type VARCHAR(50),
      fuel_type VARCHAR(50),
      transmission VARCHAR(50),
      drivetrain VARCHAR(50),
      engine VARCHAR(100),
      vin VARCHAR(50),
      stock_number VARCHAR(50),
      make VARCHAR(100) NOT NULL,
      model VARCHAR(100) NOT NULL,
      category_id INTEGER REFERENCES categories(id),
      description TEXT,
      features TEXT[],
      images TEXT[],
      featured BOOLEAN DEFAULT FALSE,
      status VARCHAR(20) DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      message TEXT,
      vehicle_id INTEGER REFERENCES vehicles(id),
      inquiry_type VARCHAR(50) DEFAULT 'general',
      status VARCHAR(20) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      buyer_data JSONB NOT NULL,
      co_buyer_data JSONB,
      vehicle_id INTEGER REFERENCES vehicles(id),
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export { sql };
