import styles from '~/styles/main.css';
import MainNavigation from '~/components/MainNavigation';
import { Link, useCatch } from '@remix-run/react';
// import NewNote from './components/NewNote';

const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {/* Outlet contains main body content */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Remix error page setup, ErrorBoundry is reconized by Remix, this is a component and
// can be used in any page. By having it in root it will cover all errors.
// This only works for general errors, not for backend generated error responses for example
// for backend generated error responses, use CatchBoundary instead, see examples below and in notes.jsx
export function ErrorBoundary({error}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety</Link>!</p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// can also use this to override pages. This catches response errors generated from backend
export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
          <p>Back to <Link to="/">safety</Link>!</p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
