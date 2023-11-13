import Wrapper from "./Landing.wrapper.js";
import main from "../../assets/images/main.svg";
import { Logo } from "../../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I&apos;m baby tumblr swag plaid you probably haven&apos;t heard of
            them pickled pabst normcore. Ugh gatekeep artisan chartreuse hoodie.
            Skateboard single-origin coffee sartorial, lo-fi XOXO bitters
            typewriter man bun tilde fanny pack tofu blue bottle pitchfork.
            Authentic iceland keffiyeh, neutra praxis shabby chic cronut
            farm-to-table messenger bag.
          </p>
          <Link to="/register" className="btn register-link">
            register
          </Link>
          <Link to="/login" className="btn login-link">
            login
          </Link>
        </div>
        <img src={main} alt="main" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
