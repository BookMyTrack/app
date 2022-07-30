import {Link} from '@remix-run/react';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

interface FooterNavigationItem {
	name: string;
	href: string;

	icon?: React.FC<any>;
}

interface IPageFooterProps {
	mainNav?: FooterNavigationItem[];
	socialNav?: FooterNavigationItem[];
}

const PageFooter: FC<PropsWithChildren<IPageFooterProps>> = ({ mainNav = [], socialNav = [] }) => (
	<footer className="mt-auto bg-white">
		<div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-12 mx-auto overflow-hidden">
			<nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
				{mainNav.map(item => (
					<div key={item.name} className="px-5 py-2">
						<Link to={item.href} className="hover:text-gray-900 text-base text-gray-500">
							{item.name}
						</Link>
					</div>
				))}
			</nav>
			<div className="flex justify-center mt-8 space-x-6">
				{socialNav.map(item => (
					<Link key={item.href} to={item.href} className="hover:text-gray-500 text-gray-400">
						<span className="sr-only">{item.name}</span>
						{item.icon && <item.icon className="w-6 h-6" aria-hidden="true" />}
					</Link>
				))}
			</div>
			<p className="mt-8 text-base text-center text-gray-400">&copy; 2022 BookMYTrack, All rights reserved.</p>
		</div>
	</footer>
);

PageFooter.displayName = 'PageFooter';

export default PageFooter;
