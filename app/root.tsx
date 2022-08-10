import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: "https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "BookMYTrack",
  description: "Book your track-days with ease",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async () => {
  const PIRSCH_ID = process.env.PIRSCH_ID!;
  const MAPBOX_ACCESS_KEY = process.env.MAPBOX_ACCESS_KEY!;

  return json({
    ENV: { PIRSCH_ID, MAPBOX_ACCESS_KEY },
  });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <html className="dark" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-w-screen flex flex-col min-h-screen rx-text-neutral-11 rx-bg-neutral-1">
        <Navbar />
        <div className="max-w-7xl flex-1 lg:px-8 sm:px-6 w-full px-4 mx-auto">
          <Outlet />
        </div>
        <Footer />

        <ScrollRestoration />

        <script
          defer
          type="text/javascript"
          src="https://api.pirsch.io/pirsch.js"
          id="pirschjs"
          data-code={ENV.PIRSCH_ID}
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
