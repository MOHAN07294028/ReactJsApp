import React from "react";
import { Controller } from "react-hook-form";
import { Input, Select, DatePicker } from "antd";

const FormField = ({
  name,
  control,
  rules,
  label,
  errors,
  options,
  nameKey = "label",
  valueKey = "_id",
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
        // rules={rules?rules :false}
        render={({ field }) => (
          <>
            <span>
              {(!errors[name] &&label) ? label + " *" : null}
              {errors && errors[name] && (
                <span className="requiredHighlight">{`${errors[name].message}`+ " *"}</span>
              )}
            </span>
            <SelectedComponent
              className="ocs-fields"
              options={
                render == "select" &&
                options &&
                options.length > 0 &&
                options.map((item) => {
                  return {
                    label: item[nameKey || "label"],
                    value: item[valueKey || "_id"],
                  };
                })
              }
              {...field}
              {...rest}
            />
          </>
        )}
      />
    </div>
  );
};

export default FormField;
