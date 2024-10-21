import { defineCollection, z } from 'astro:content';

const about = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.coerce.string(),
		heroImage: image().optional(),
	}),
});

export const collections = { about };
