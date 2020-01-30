import React from "react";
import PropTypes from "prop-types";

const getByPath = (obj, path) =>
  path.split(/[[\].]/).reduce((obj, key) => obj?.[key], obj);

const OTHER_TEXT_TH = "อื่น ๆ";

export const ErrorMessage = ({ error }) => {
  return error ? (
    <div className="text-sm text-primary-400">
      {error?.type === "required" && <p>กรุณาระบุ</p>}
      {error?.message && <p>{error?.message}</p>}
    </div>
  ) : null;
};

export const TextInput = React.forwardRef(
  ({ label, name, forms, placeholder, type, disabled }, ref) => {
    const error = getByPath(forms.errors, name);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
          {label}
        </label>
        <input
          className={"form-input w-full"}
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          type={type || "text"}
          disabled={disabled}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  forms: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export const RadioGroup = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <p className="block text-gray-700 font-medium mb-2">{label}</p>
        {options.map(option => (
          <label className="inline-flex mx-2 my-1" key={option}>
            <input
              type="radio"
              className="form-radio mt-1"
              name={name}
              ref={ref}
              value={option}
            />
            <span className="ml-1">{option}</span>
          </label>
        ))}
        {others && (
          <div className="inline-block">
            <label className="inline-flex mx-2 py-3">
              <input
                type="radio"
                className="form-radio mt-1"
                name={name}
                ref={ref}
                value={OTHER_TEXT_TH}
              />
              <span className="ml-1">{OTHER_TEXT_TH}</span>
            </label>
            {forms.watch(name) === OTHER_TEXT_TH && (
              <input
                className="form-input"
                name={othersName}
                ref={ref}
                placeholder="โปรดระบุ"
              />
            )}
          </div>
        )}
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          <ErrorMessage error={othersError} />
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  forms: PropTypes.object.isRequired,
  others: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export const Select = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
          {label}
        </label>
        <select
          className="form-select block w-full"
          id={name}
          name={name}
          ref={ref}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

          {others && (
            <option key="others" value={OTHER_TEXT_TH}>
              {OTHER_TEXT_TH}
            </option>
          )}
        </select>

        {forms.watch(name) === OTHER_TEXT_TH && (
          <input
            className="form-input"
            name={othersName}
            ref={ref}
            placeholder="โปรดระบุ"
          />
        )}
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          <ErrorMessage error={othersError} />
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  forms: PropTypes.object.isRequired,
  others: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export const Checks = React.forwardRef(
  ({ label, name, options, others, forms }, ref) => {
    const othersName = typeof others === "string" ? others : name + "_others";
    const error = getByPath(forms.errors, name);
    const othersError = getByPath(forms.errors, othersName);
    return (
      <div className="mb-4">
        <p className="block text-gray-700 font-medium mb-2">
          {label}{" "}
          <span className="font-normal text-gray-500 whitespace-no-wrap">
            (ระบุได้มากกว่า 1 ข้อ)
          </span>
        </p>
        {options.map(option => (
          <label className="flex mx-2 my-1" key={option}>
            <input
              type="checkbox"
              className="form-checkbox mt-1"
              name={name}
              ref={ref}
              value={option}
            />
            <span className="ml-1">{option}</span>
          </label>
        ))}
        {others && (
          <div className="block">
            <label className="inline-flex mx-2 py-3">
              <input
                type="checkbox"
                className="form-checkbox mt-1"
                name={name}
                ref={ref}
                value={OTHER_TEXT_TH}
              />
              <span className="ml-1">{OTHER_TEXT_TH}</span>
            </label>
            {forms.watch(name)?.includes(OTHER_TEXT_TH) && (
              <input
                className="form-input"
                name={othersName}
                ref={ref}
                placeholder="โปรดระบุ"
              />
            )}
          </div>
        )}
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          <ErrorMessage error={othersError} />
        )}
      </div>
    );
  }
);

Checks.displayName = "Checks";

Checks.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  forms: PropTypes.object.isRequired,
  others: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};
