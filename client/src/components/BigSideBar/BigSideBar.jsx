import Wrapper from "./BigSideBar.wrapper.js";
import NavLinks from "../NavLinks.jsx";
import Logo from "../Logo.jsx";
import { useDashboardContext } from "../../pages/Dashboard/DashboardLayout.jsx";

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
