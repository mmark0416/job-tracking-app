import { useAllJobsContext } from "../../pages/AllJobs";
import Job from "../Job/Job";
import Wrapper from "./JobsContainer.wrapper";

const JobsContainer = () => {
  const { jobs } = useAllJobsContext();

  if (!jobs.length) {
    return (
      <Wrapper>
        <h2>no jobs found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
