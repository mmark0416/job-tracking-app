import Wrapper from "./JobInfo.wrapper";
import PropTypes from "prop-types";

const JobInfo = ({ Icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{Icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

JobInfo.propTypes = {
  Icon: PropTypes.element,
  text: PropTypes.string,
};

export default JobInfo;
