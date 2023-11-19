import { useState } from "react";
import BarChart from "../BarChart";
import AreaChart from "../AreaChart";
import Wrapper from "./ChartsContainer.wrapper.js";
import PropTypes from "prop-types";

const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

ChartContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChartContainer;
