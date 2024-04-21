import { doublePrecision, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
	id: text('id').primaryKey().default('uuid_generate_v4()'),
	imageId: text('image_id').notNull(),
	name: text('name').notNull(),
	price: doublePrecision('price').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export type Product = typeof products.$inferSelect;
