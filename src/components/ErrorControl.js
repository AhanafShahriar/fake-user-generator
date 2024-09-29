import React from "react";

const ErrorControl = ({ errors, setErrors }) => {
  const handleChange = (e) => {
    // Convert the value to an integer, or default to 0 if invalid
    const value = parseInt(e.target.value, 10);

    // Prevent NaN by ensuring the value is a valid number or 0
    setErrors(isNaN(value) ? 0 : value);
  };
  return (
    <div className='d-flex align-items-center'>
      <label
        htmlFor='errorSlider'
        className='form-label me-2'>
        Errors:
      </label>

      <input
        type='range'
        id='errorSlider'
        className='form-range me-2'
        min='0'
        max='10'
        step='0.5'
        value={errors}
        onChange={handleChange}
      />

      <input
        type='number'
        className='form-control'
        min='0'
        max='1000'
        value={errors}
        onChange={(e) => setErrors(parseFloat(e.target.value))}
        style={{ width: "80px" }}
      />
    </div>
  );
};

export default ErrorControl;
