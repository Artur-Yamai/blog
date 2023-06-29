import { useState, useEffect } from "react";
import ReactSelect, { SingleValue } from "react-select";
import { SelectProps } from "./SelectProps";
import "./Select.scss";

export const Select = ({
  options,
  value,
  onChange,
  isLoading = false,
  isClearable = false,
  placeholder,
  valueKey = "value",
  labelKey = "label",
}: SelectProps) => {
  const [intermediateValue, setIntermediateValue] =
    useState<SingleValue<any>>();

  const toChange = (newValue: SingleValue<any>) => {
    onChange(newValue);
    setIntermediateValue(newValue);
  };

  useEffect(() => {
    const res = options.find((option) => option[valueKey] === value);
    if (res) {
      setIntermediateValue(res);
    }
  }, [options, valueKey, value]);

  return (
    <ReactSelect
      value={intermediateValue}
      classNamePrefix="custom-select"
      isLoading={isLoading}
      options={options}
      onChange={toChange}
      isClearable={isClearable}
      placeholder={placeholder}
      getOptionValue={(e) => e[valueKey]}
      getOptionLabel={(e) => e[labelKey]}
    />
  );
};