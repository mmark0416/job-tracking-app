import { Link, useRouteError } from "react-router-dom";
import Wrapper from "./Error.wrapper";
import img from "../../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>ohh! page not found</h3>
          <p>we can&apos;t seem to find the you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>something went wrong</h3>
      <Link to="/">back home</Link>
    </Wrapper>
  );
};

export default Error;
