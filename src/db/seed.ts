import { faker } from '@faker-js/faker';
import { neon } from '@neondatabase/serverless';
import { Index } from '@upstash/vector';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { v4 as uuidv4 } from 'uuid';

import { vectorize } from '@/lib';

import { productsTable } from './schema';

const index = new Index();

(async function main() {
	const connector = neon(process.env.DATABASE_URL!);
	const db = drizzle(connector);

	const productData = [
		{
			imageUrl: 'dark_down_jacket_1.png',
			description: `A sleek, insulated down jacket designed for chilly urban adventures. Its slim fit and dark hue make it a versatile addition to any winter wardrobe.`,
		},
		{
			imageUrl: 'dark_down_jacket_2.png',
			description: `This durable down jacket offers exceptional warmth with a touch of elegance. Perfect for those who demand both style and functionality in cold weather.`,
		},
		{
			imageUrl: 'dark_fleece_jacket_1.png',
			description: `Experience the cozy warmth of this dark fleece jacket. Ideal for layering, its soft texture and classic design ensure comfort and style on cooler days.`,
		},
		{
			imageUrl: 'dark_leather_jacket_1.png',
			description: `A timeless dark leather jacket that combines classic styling with rugged durability. Perfect for adding an edge to any outfit, rain or shine.`,
		},
		{
			imageUrl: 'dark_parka_jacket_1.png',
			description: `Stay protected against the elements with this durable parka. Its insulated lining and fur-trimmed hood offer warmth and style in harsh conditions.`,
		},
		{
			imageUrl: 'dark_parka_jacket_2.png',
			description: `This sleek parka features a waterproof exterior and a thermal interior, making it a must-have for winter escapades in the city or the mountains.`,
		},
		{
			imageUrl: 'dark_parka_jacket_3.png',
			description: `With its adjustable features and multiple pockets, this parka blends practicality with modern aesthetics for the ultimate winter outerwear.`,
		},
		{
			imageUrl: 'dark_trench_coat_1.png',
			description: `A modern twist on a classic design, this dark trench coat offers both sophistication and weather resistance, perfect for rainy days.`,
		},
		{
			imageUrl: 'light_down_jacket_1.png',
			description: `Lightweight yet warm, this down jacket is an essential layer for transitional weather, offering comfort without bulk.`,
		},
		{
			imageUrl: 'light_down_jacket_2.png',
			description: `Embrace the cold in this light and airy down jacket, featuring a water-resistant shell and a sleek design for everyday wear.`,
		},
		{
			imageUrl: 'light_down_jacket_3.png',
			description: `This stylish down jacket combines warmth and lightweight design, making it the perfect companion for winter travel.`,
		},
		{
			imageUrl: 'light_fleece_jacket_1.png',
			description: `Enjoy the soft touch of this light fleece jacket, designed for brisk mornings and cool evenings, with a versatile zip-up style for easy layering.`,
		},
		{
			imageUrl: 'light_jeans_jacket_1.png',
			description: `A casual classic, this light denim jacket adds a layer of cool to any outfit, perfect for those crisp, sunny days.`,
		},
		{
			imageUrl: 'light_jeans_jacket_2.png',
			description: `Upgrade your casual wear with this distressed light denim jacket, featuring a relaxed fit and timeless appeal.`,
		},
		{
			imageUrl: 'light_parka_jacket_1.png',
			description: `This light parka offers a breathable, water-resistant layer, ideal for unpredictable weather, with a sleek design that doesn't compromise on style.`,
		},
		{
			imageUrl: 'light_trench_coat_1.png',
			description: `A chic and lightweight trench coat that brings an elegant layer to spring and autumn outfits, with a belted waist for a flattering fit.`,
		},
		{
			imageUrl: 'light_trench_coat_2.png',
			description: `Enjoy a stylish and sophisticated look with this lightweight trench coat made from a fabric that resists both wind and rain. Perfect for the transition between seasons.`,
		},
		{
			imageUrl: 'light_wind_jacket_1.png',
			description: `Take on the breezy days with this lightweight wind jacket that is designed to offer protection and style with its minimalist design and functional features.`,
		},
		{
			imageUrl: 'light_wind_jacket_2.png',
			description: `A versatile windbreaker for active days. This jacket offers lightweight comfort and resistance to the elements in a sleek package.`,
		},
		{
			imageUrl: 'light_wind_jacket_3.png',
			description: `Stay ahead of the weather with this dynamic light wind jacket, combining breathability with waterproof technology for all-day comfort.`,
		},
		{
			imageUrl: 'light_wind_jacket_4.png',
			description: `A comfortable wind jacket designed to keep you warm during winter or rain. With a minimal light grey color it suits the rest of your outfit well.`,
		},
	];

	const products: (typeof productsTable.$inferInsert)[] = productData.map(
		({ imageUrl, description }) => ({
			id: uuidv4(),
			imageUrl,
			name: formatFileName(imageUrl),
			price: parseFloat(faker.commerce.price({ min: 40, max: 200 })),
			description,
		}),
	);

	products.forEach(async (product) => {
		await db.insert(productsTable).values(product).onConflictDoNothing();

		await index.upsert({
			id: product.id!,
			vector: await vectorize(`${product.name}: ${product.description}`),
			metadata: product,
		});
	});
})();

function formatFileName(fileName: string): string {
	const nameWithoutExtension = fileName.replace(/\.\w+$/, '');
	const words = nameWithoutExtension.split('_');

	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);

	return capitalizedWords.join(' ');
}
