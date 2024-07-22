// src/components/SocialMediaIcon.js

import React from "react";
import PropTypes from "prop-types";

const SocialMediaIcon = ({ platform, url, iconClass }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white mx-2"
    >
      <i className={iconClass}></i>
    </a>
  );
};

SocialMediaIcon.propTypes = {
  platform: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
};

export default SocialMediaIcon;
