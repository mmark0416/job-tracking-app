import { useDashboardContext } from "../../pages/Dashboard/DashboardLayout.jsx";
import Logo from "../Logo.jsx";
import LogoutContainer from "../LogoutContainer/LogoutContainer.jsx";
import ThemeToggle from "../ThemeTogle/ThemeToggle.jsx";
import Wrapper from "./Navbar.wrapper.js";
import { FaAlignLeft } from "react-icons/fa";

const Navbar = () => {
  const {toggleSidebar} = useDashboardContext()

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="logo">
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
