import React from "react";

const quickLinksData = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
  { text: "Services", link: "/services" },
  { text: "Contact", link: "/contact" },
];

function Footer() {
  return (
    <footer className="text-black text-center py-4">
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinksData.map((link, index) => (
                <li key={index}>
                  <a href={link.link}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>123 Main Street</p>
              <p>City, State 12345</p>
              <p>Email: info@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
      </div>
      <p className="text-center">© BOOTSTRAPFINDS. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
