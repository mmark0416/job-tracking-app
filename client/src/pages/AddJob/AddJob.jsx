import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "./DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUSES, JOB_TYPES } from "../../../../utils/constants.utils.js";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fData = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", fData);
    toast.success("job added");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText={"job status"}
            name="jobStatus"
            defaultValue={JOB_STATUSES.PENDING}
            list={Object.values(JOB_STATUSES)}
          />
          <FormRowSelect
            labelText={"job type"}
            name="jobType"
            defaultValue={JOB_TYPES.FULL_TIME}
            list={Object.values(JOB_TYPES)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
