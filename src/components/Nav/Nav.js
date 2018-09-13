import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/shelf">
            View Shelf
          </Link>
        </li>
        <li>
          <Link to="/add">
            Add Item
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
