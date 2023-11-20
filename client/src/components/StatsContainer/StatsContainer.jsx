import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "./StatsContainer.wrapper.js";
import StatItem from "../StatItem/StatItem";
import PropTypes from "prop-types";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats.pending,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interview scheduled",
      count: defaultStats.interview,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Declined",
      count: defaultStats.declined,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </Wrapper>
  );
};

StatsContainer.propTypes = {
  defaultStats: PropTypes.shape({
    pending: PropTypes.number,
    interview: PropTypes.number,
    declined: PropTypes.number,
  }),
};

export default StatsContainer;
