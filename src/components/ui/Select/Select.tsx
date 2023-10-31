import React from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  /**
   * The label for the select input.
   */
  label: string;
  /**
   * The currently selected value.
   */
  value: string;
  /**
   * An array of options for the select input.
   */
  options: SelectOption[];
  /**
   * A callback function to handle the change event.
   * @param index - The index of the selected option.
   */
  onChange: (index: number) => void;
};

/**
 * A custom select input component.
 *
 * @param {SelectProps} props - The props for the Select component.
 * @returns {React.ReactElement} - The rendered Select component.
 */
export default function Select({
  label,
  value,
  options,
  onChange
}: SelectProps): React.ReactElement {
  /**
   * Handles the change event of the select input.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event object.
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    onChange(selectedIndex);
  };

  return (
    <div className="dropdown">
      <label htmlFor={label}>{label}</label>
      <select id={label} onChange={handleChange} value={value}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}