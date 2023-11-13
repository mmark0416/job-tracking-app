import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register app</h1>
      <Link to={"/login"}>Login Page</Link>
    </div>
  );
};

export default Register;
