import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Gamal Ahmed.</div>
      <div>
        <Link to={"https://www.facebook.com/gamalahmed3265"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@gamalahmed3265"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/gamalahmed3265/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/gamalahmed3265"} target="_blank">
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;