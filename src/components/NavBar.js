import React from "react";
import "./css/NavBar.css";

const navBar = props => {
  const { linkItems } = props;
  let navBarArray = linkItems.map(nav => (
    <li className="nav_list_item" onClick={nav.func} key={nav.key}>
      <span className="navIcon">{"◀"}</span>
      {nav.text}
    </li>
  ));

  return <ul className="navigation">{navBarArray}</ul>;
};

export default navBar;
