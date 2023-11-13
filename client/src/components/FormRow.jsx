import PropTypes from "prop-types";

const FormRow = ({type, name, labelText, defaultValue}) => {
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
      />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default FormRow;