import React from 'react';

function Footer() {
  var currentYear = new Date().getFullYear();
  return(
    <div className="footer">
      <footer>&copy; Copyrght {currentYear} eddieprogramming</footer>
    </div>

  );
}


export default Footer;
