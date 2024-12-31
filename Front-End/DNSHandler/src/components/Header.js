import React from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <header className="app-header">
            <div className="container-fluid">
                <div className="row gutters">
                    <div className="col-xl-7 col-lg-7 col-md-6 col-sm-7 col-7">
                        <div className="logo-block">
                            <a href="/">
                                <img
                                    src={logo}
                                    alt="Kingfisher Admin Dashboard"
                                    style={{ width: '220px', height: '50px', marginTop: '5px' }}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-5 col-5">
                        <ul className="header-actions">
                            <li className="dropdown">
                                <a  id="userSettings" className="user-settings">
                  <span className="avatar">
                    Ad<span className="status online"></span>
                  </span>
                                    <span className="user-name">Admin</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
