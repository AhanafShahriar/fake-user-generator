import React from "react";

const SeedControl = ({ seed, setSeed }) => {
  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        htmlFor='seedInput'
        className='form-label'
        style={{ marginRight: "10px" }}>
        Seed:
      </label>
      <input
        type='number'
        id='seedInput'
        className='form-control'
        value={seed}
        onChange={(e) => setSeed(parseInt(e.target.value))}
        style={{ marginRight: "10px", width: "150px" }}
      />

      <button
        className='btn btn-secondary'
        onClick={generateRandomSeed}>
        Randomize
      </button>
    </div>
  );
};

export default SeedControl;
