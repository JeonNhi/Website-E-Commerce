/** @format */

import React, { memo } from "react";
import Select from "react-select";

const SelectCustom = ({ options, setSelectedOption, selectedOption }) => {
  return (
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      value={selectedOption}
      options={options}
      placeholder="Select..."
      isClearable={true}
    />
  );
};

export default memo(SelectCustom);
