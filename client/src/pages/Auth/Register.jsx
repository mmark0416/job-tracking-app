import { Link } from "react-router-dom";
import Wrapper from "./RegisterAndLogin.wrapper";
import { FormRow, Logo } from "../../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="mark" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="majoros"
        />
        <FormRow type="text" name="location" defaultValue="europa" />
        <FormRow type="text" name="email" defaultValue="mark@gmail.com" />
        <FormRow type="password" name="password" defaultValue="1234" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
