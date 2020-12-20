import React from 'react';

import Navbar from './navbar.js';
import Footer from './footer.js';

import background from '../../assets/img/backgrounds/background-1.jpg';

export default function (props) {
  return (
    <>
      <Navbar />
      {!props.homePage && (
        <div className="position-relative">
          <section className="section section-lg section-shaped pb-250">
            <div
              className="shape"
              style={{
                backgroundImage:
                  'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(' +
                  background +
                  ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 25%'
              }}
            />
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon className="fill-white" points="2560,0 2560,100 0,100" />
              </svg>
            </div>
          </section>
        </div>
      )}
      {props.children}
      <Footer />
    </>
  );
}
