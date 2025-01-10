
import { FC, ReactNode } from 'react';
import scss from './LayoutAdmin.module.scss';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';

interface LayoutAdminProps {
	children: ReactNode;
}

const LayoutAdmin: FC<LayoutAdminProps> = ({ children }) => {
	return (
		<div className={scss.LayoutPage}>
			<HeaderAdmin/>
			<main>{children}</main>
		</div>
	);
};
export default LayoutAdmin;
