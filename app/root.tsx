import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from './components/Navbar';

import styles from './styles/tailwind.css'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
]

export const meta: MetaFunction = () => ( {
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
} );

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className='rx-text-neutral-11 rx-bg-neutral-1'>
        <Navbar />
        <div className='max-w-7xl lg:px-8 sm:px-6 w-full px-4 mx-auto'>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
