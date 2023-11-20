import { Link, Form, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect } from "../";
import Wrapper from "./SearchContainer.wrapper.js";
import {
  JOB_STATUSES,
  JOB_TYPES,
  JOB_SORT_BY,
} from "../../../../utils/constants.utils";
import { useAllJobsContext } from "../../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  let { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timetout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timetout);
      timetout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  const handleResetBtn = () => {
    search = "";
    jobStatus = "all";
    jobType = "all";
    sort = JOB_SORT_BY.NEWEST;
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUSES)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPES)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/all-jobs"
            onClick={handleResetBtn}
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
