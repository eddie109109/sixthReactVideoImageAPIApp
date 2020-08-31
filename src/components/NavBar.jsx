import React from 'react';

function NavBar() {
  return (
    <div className="NavBar">
    <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: "#e3f2fd"}}>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>

        </ul>
      </div>
    </nav>
    </div>
  );
}


export default NavBar;
