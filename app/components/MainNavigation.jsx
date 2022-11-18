import { NavLink } from '@remix-run/react';

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
            {/* NavLink is liek the Link component but also adds an 'active' css class when active */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;