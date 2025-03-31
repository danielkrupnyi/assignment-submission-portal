import Link from 'next/link';
import { Container } from '../components/Container';

const ThankYouPage = () => {
	return (
		<Container>
			<div className='flex flex-col gap-6 items-center justify-center min-h-screen'>
				<h1 className='text-lg text-center'>
					Thank you for submitting your assignment!
				</h1>
				<button>
					<Link href='/' className='btn btn-primary'>
						Go to Home
					</Link>
				</button>
			</div>
		</Container>
	);
};

export default ThankYouPage;
