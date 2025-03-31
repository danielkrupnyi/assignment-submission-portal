'use server';

import { FormDataSchema } from '@/lib/form-schema';
import { z } from 'zod';

export const fetchLevels = async (): Promise<string[]> => {
	try {
		const res = await fetch(
			`https://tools.qa.ale.ai/api/tools/candidates/levels`
		);

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json();
		return data.levels;
	} catch (error) {
		console.error('Error fetching levels:', error);
		return [];
	}
};

type Inputs = z.infer<typeof FormDataSchema>;

export const submitAssignment = async (formData: Inputs) => {
	try {
		const res = await fetch(
			`https://tools.qa.ale.ai/api/tools/candidates/assignments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
		);

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || 'Failed to submit assignment');
		}

		return res.json();
	} catch (error) {
		console.error('Error submitting assignment:', error);
		throw error;
	}
};
