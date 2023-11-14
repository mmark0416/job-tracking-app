import { useDashboardContext } from "../pages/Dashboard/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinks = ({isBigSidebar}) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, icon, path } = link;
        return (
          <NavLink
            key={text}
            to={path}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

NavLinks.propTypes = {
  isBigSidebar: PropTypes.bool,
};

export default NavLinks;
