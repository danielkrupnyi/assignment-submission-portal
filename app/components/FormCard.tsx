import { fetchLevels } from '@/_actions';
import { Form } from './Form';

export const FormCard = async () => {
	const levels = await fetchLevels();

	return (
		<div className='card card-border bg-base-100 w-96'>
			<div className='card-body'>
				<h2 className='card-title'>Assignment Submission Form</h2>
				<Form levels={levels} />
			</div>
		</div>
	);
};
