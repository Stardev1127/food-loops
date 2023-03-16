import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TopNav from '../../components/topNav';
import './styles.scss';

export const withDashboard = (ChildComponent) => (props) =>
  (
    <div id="mjlApp">
      <nav className="nav-right">
        <div className="nav-brand d-flex">
          <h3 style={{ height: 32, marginTop: 4, color: '#fff' }}>Dashboard</h3>

          {/* <div className="img-wrap">
            <img src="/favicon.ico" width="22px" alt="logo" />
          </div> */}
        </div>
        <ul className="nav-links neutralize">
          <li>
            <NavLink to="/" exact={true}>
              <div className="s-icon">
                <i className="fas fa-home"></i>
              </div>{' '}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <div className="s-icon">
                <i className="fas fa-utensils"></i>
              </div>{' '}
              Menu
            </NavLink>
          </li>
        </ul>

        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            color: '#fff',
            transform: 'translateX(-50%)',
            fontWeight: 700,
          }}
        >
          &copy;{' '}
          <a
            href="https://manjiltamang.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Manjil Tamang
          </a>
        </div>
      </nav>
      <div className="_main_panel">
        <TopNav />
        <div className="_bod_wrap">
          <div className="_bod_content">
            <Container>
              <ChildComponent {...props} />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
