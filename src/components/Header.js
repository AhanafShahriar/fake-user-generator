import React from "react";

const Header = ({ region, setRegion }) => {
  return (
    <div className='d-flex align-items-center'>
      <label
        htmlFor='regionSelect'
        className='form-label me-2'>
        Region:
      </label>
      <select
        id='regionSelect'
        className='form-select'
        value={region}
        onChange={(e) => setRegion(e.target.value)}>
        <option value='USA'>USA</option>
        <option value='Poland'>Poland</option>
        <option value='Greece'>Greece</option>
      </select>
    </div>
  );
};

export default Header;
