import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const query = `CREATE TABLE IF NOT EXISTS books(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    author TEXT NOT NULL,
    photo_url TEXT,
    tag TEXT[]);`;

client.query(query)
    .then(value => console.log("Migrated successfully")).
    catch(console.log)
    .finally(() => process.exit(1));
