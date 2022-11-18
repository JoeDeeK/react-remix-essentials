import homeStyles from '~/styles/home.css';
import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keep track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>

      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>

      {/*
      <a href="notes">Go to Notes Page using Server Side Rendering</a>
      <Link to="notes">Go to Notes Page using Client Side Rendering</Link>
      */}

    </main>

  );
}

export function links() { // links function is reconized by Remix
  return [{ rel: 'stylesheet', href: homeStyles }];
}
