import { z } from 'zod';

export const FormDataSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	assignment_description: z
		.string()
		.min(10, 'Assignment description must be at least 10 characters'),
	github_repo_url: z
		.string()
		.url('Invalid URL')
		.regex(
			/^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/,
			'Invalid GitHub URL. Must be a valid GitHub repository URL'
		),
	candidate_level: z.string().nonempty('Please select a candidate level'),
});
