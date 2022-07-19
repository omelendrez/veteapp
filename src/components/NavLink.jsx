import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = (props) => {
  const { pathname: page } = useLocation()
  const isActive = props.to.includes(page.split('/')[1]);
  const className = 'nav-link ' && isActive ? 'active' : '';

  return (
    <li className={className}>
      <Link className="nav-link" {...props}>
        {props.children}
      </Link>
    </li>
  );
}

export default NavLink;