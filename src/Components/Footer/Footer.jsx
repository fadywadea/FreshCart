import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon, faCcMastercard, faCcPaypal, faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer-container py-4">
      <div className="container">
        <div className="col-md-6 mb-4">
          <h3>Get the FreshCart app</h3>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 mt-2 mb-2">
            <h3>Payment Partners</h3>
            <FontAwesomeIcon icon={faAmazon} size="2x" className="mr-3 me-5" />
            <FontAwesomeIcon icon={faCcMastercard} size="2x" className="mr-3 me-5" />
            <FontAwesomeIcon icon={faCcPaypal} size="2x" className="mr-3" />
          </div>
          <div className="col-md-6 mt-2 mb-2 text-right">
            <h3>Get deliveries with FreshCart</h3>
            <FontAwesomeIcon icon={faApple} size="2x" className="mr-3 me-5" />
            <FontAwesomeIcon icon={faGooglePlay} size="2x" className="mr-3" />
          </div>
        </div>
        <hr />
      </div>
    </footer>
  );
}
