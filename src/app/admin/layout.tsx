"use client"
import LayoutAdmin from '@/appPages/admin/components/layout/LayoutAdmin';
import { FC, ReactNode } from 'react';
interface LayoutType {
	children: ReactNode;
}
const Layout: FC<LayoutType> = ({ children }) => {
	return <LayoutAdmin>{children}</LayoutAdmin>;
};
export default Layout;
