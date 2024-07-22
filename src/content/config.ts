import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.coerce.string(),
		// Transform string to Date object
		pubDate: z.coerce.string(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		heroVideo: z.string().optional(),
		order: z.number().default(0)
	}),
});

export const collections = { blog };
