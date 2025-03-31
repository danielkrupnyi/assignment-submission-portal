import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
	return <div className={clsx('container mx-auto', className)}>{children}</div>;
};
