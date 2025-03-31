import { Container } from './components/Container';
import { FormCard } from './components/FormCard';

export default function Home() {
	return (
		<main>
			<Container className='flex flex-col items-center justify-center min-h-screen'>
				<FormCard />
			</Container>
		</main>
	);
}
