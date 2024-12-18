import React from "react";
import { Helmet } from "react-helmet";
import NotFoundImage from "../../Assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Not Found</title>
      </Helmet>
      <div>
        <img src={NotFoundImage} alt="" />
      </div>
    </>
  );
}
