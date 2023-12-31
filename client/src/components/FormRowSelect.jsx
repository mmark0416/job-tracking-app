import PropTypes from "prop-types";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

FormRowSelect.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.string,
  list: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormRowSelect;
