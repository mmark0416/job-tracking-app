import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "./RegisterAndLogin.wrapper";
import { FormRow, Logo } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  try {
    await customFetch.post("/auth/register", data)
    toast.success("Registration successful")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data.msg)
    return null
  }
}

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
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
        <FormRow type="password" name="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
