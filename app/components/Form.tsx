'use client';

import { submitAssignment } from '@/_actions';
import { FormDataSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormProps {
	levels: readonly string[];
}

type Inputs = z.infer<typeof FormDataSchema>;

export const Form: FC<FormProps> = ({ levels }) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(FormDataSchema),
		defaultValues: {
			candidate_level: undefined,
		},
	});

	const router = useRouter();
	const [selectedLevel, setSelectedLevel] = useState('Choose an option');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const dropdownRef = useRef<HTMLDetailsElement>(null);

	const handleLevelClick = () => {
		dropdownRef.current?.removeAttribute('open');
	};

	const onSubmit: SubmitHandler<Inputs> = async formData => {
		try {
			setIsSubmitting(true);
			setError(null);

			const result = await submitAssignment(formData);

			if (result.status === 'error') {
				setError(result.message);
			} else {
				reset();
				setSelectedLevel('Choose an option');
				router.push('/thank-you');
			}
		} catch {
			setError('Something went wrong');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<fieldset className='fieldset'>
				<legend className='fieldset-legend'>What is your name?</legend>
				<input
					{...register('name')}
					type='text'
					className='input'
					placeholder='Type here'
				/>
				{errors.name && (
					<p className='text-error text-sm mt-1'>{errors.name.message}</p>
				)}
			</fieldset>

			<fieldset className='fieldset'>
				<legend className='fieldset-legend'>What is your email?</legend>
				<input
					{...register('email')}
					type='email'
					className='input'
					placeholder='mail@site.com'
				/>
				{errors.email && (
					<p className='text-error text-sm mt-1'>{errors.email.message}</p>
				)}
			</fieldset>

			<fieldset className='fieldset'>
				<legend className='fieldset-legend'>Assignment Description</legend>
				<textarea
					{...register('assignment_description')}
					className='textarea h-24'
					placeholder='...'
				></textarea>
				{errors.assignment_description && (
					<p className='text-error text-sm mt-1'>
						{errors.assignment_description.message}
					</p>
				)}
			</fieldset>

			<fieldset className='fieldset'>
				<legend className='fieldset-legend'>GitHub Repository URL</legend>
				<input
					{...register('github_repo_url')}
					type='url'
					className='input'
					placeholder='https://'
				/>
				{errors.github_repo_url && (
					<p className='text-error text-sm mt-1'>
						{errors.github_repo_url.message}
					</p>
				)}
			</fieldset>

			<fieldset className='fieldset'>
				<legend className='fieldset-legend'>Candidate Level</legend>

				<details className='dropdown dropdown-top' ref={dropdownRef}>
					<summary className='btn btn-block'>{selectedLevel}</summary>
					<ul className='menu dropdown-content border bg-base-100 rounded-box z-1 w-full p-2 shadow-sm'>
						{levels &&
							levels.map(level => (
								<li key={level}>
									<a
										onClick={() => {
											setSelectedLevel(level);
											setValue('candidate_level', level);
											handleLevelClick();
										}}
									>
										{level}
									</a>
								</li>
							))}
					</ul>
				</details>
				<input type='hidden' {...register('candidate_level')} />
				{errors.candidate_level && (
					<p className='text-error text-sm mt-1'>
						{errors.candidate_level.message}
					</p>
				)}
			</fieldset>

			<button
				type='submit'
				className='btn btn-primary btn-block mt-4'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>

			{error && <p className='text-error text-sm mt-2'>{error}</p>}
		</form>
	);
};
