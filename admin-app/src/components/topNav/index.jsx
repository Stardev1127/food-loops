import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../actions';
import { selectAuth } from '../../selectors';
import './styles.scss';

const TopNav = () => {
  const auth = useSelector(selectAuth);

  let appNode;

  function onMenuIconClick() {
    if (!appNode) appNode = document.getElementById('mjlApp');

    if (appNode) {
      const { classList } = appNode;
      classList.contains('nav-open')
        ? classList.remove('nav-open')
        : classList.add('nav-open');
    }
  }

  function onLogout() {
    signOut();
  }

  return (
    <nav className="nav-top d-flex">
      <Button variant="link" onClick={onMenuIconClick} className="hamburger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          role="img"
          aria-label="Open navigation menu"
        >
          <path d="M0 9.333v-2.667h32v2.667h-32zM10.667 25.333v-2.667h21.333v2.667h-21.333zM5.333 17.333v-2.667h26.667v2.667h-26.667z"></path>
        </svg>
      </Button>

      <div></div>

      <ul className="nav-links neutralize list-inline">
        <li className="dropdown">
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              style={{ display: 'inline-block' }}
            >
              <div className="nav-avatar">{auth.name.charAt(0)}</div>
              <strong>{auth.name}</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">
                <i className="fas fa-user"></i> Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
