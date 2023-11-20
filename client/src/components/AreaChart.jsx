import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#c45a08" fill="#f59347" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

AreaChartComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AreaChartComponent;
