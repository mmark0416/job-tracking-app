import PropTypes from "prop-types";

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        required
        onChange={onChange}
      />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormRow;
