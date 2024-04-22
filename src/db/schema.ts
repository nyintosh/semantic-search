import {
	doublePrecision,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: uuid('id').defaultRandom().primaryKey(),
	imageUrl: text('image_url').notNull(),
	name: text('name').notNull(),
	price: doublePrecision('price').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export type Product = typeof productsTable.$inferSelect;
