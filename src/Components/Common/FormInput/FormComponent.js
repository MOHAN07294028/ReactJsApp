import React from "react";
import { Controller } from "react-hook-form";
import { Input, Select, DatePicker } from "antd";

const FormField = ({
  name,
  control,
  rules,
  label,
  errors,
  render = "input",
  ...rest
}) => {
  const components = {
    input: Input,
    password: Input.Password,
    select: Select,
    datepicker: DatePicker,
    // Add more components here if needed
  };

  const SelectedComponent = components[render];

  return (
    <div>
      <Controller
        name={name}
        control={control}
        // rules={{ validate: getValidationRules }}
        // rules={rules?rules :false}
        render={({ field }) => (
          <>
            <span>
              {!errors[name] && label+'*'}
              { errors && errors[name] && (
                <span className="requiredHighlight">{`${errors[name].message}`}</span>
              )}
            </span>
            <SelectedComponent className="ocs-fields" {...field} {...rest} />
          </>
        )}
      />
    </div>
  );
};

export default FormField;
