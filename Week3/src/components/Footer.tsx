import React from "react";
import "./footer.scss";
import facebook from "../assets/fc.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";

const Footer = () => {
  return (
    <div className="container">
      <div className="footer">
        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>Devices</li>
          <li>Pricing</li>
          <li>FAQ</li>
        </ul>
        <ul>
          <li>Movies</li>
          <li>Gernes</li>
          <li>Trending</li>
          <li>New Release</li>
          <li>Popular</li>
        </ul>
        <ul>
          <li>Shows</li>
          <li>Gernes</li>
          <li>Trending</li>
          <li>New Release</li>
          <li>Popular</li>
        </ul>
        <ul>
          <li>Support</li>
          <li>Contact Us</li>
        </ul>
        <ul>
          <li>Subscription</li>
          <li>Plans</li>
          <li>Features</li>
        </ul>
        <ul>
          <li>Connect With Us</li>
          <div className="flex">
            <li>
              <img src={facebook} alt="" />
            </li>
            <li>
              <img src={twitter} alt="" />
            </li>
            <li>
              <img src={linkedin} alt="" />
            </li>
          </div>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-24 border-t border-[#262626] ">
        <p className="text-[#999999]">@2023 streamvib, All Rights Reserved</p>
        <ul className="flex">
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
