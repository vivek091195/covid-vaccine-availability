import React, { useState } from 'react';

const fetchVaccineCenters = (pinCodes) => {
  const pinCodesArray = pinCodes.split(',');
  pinCodesArray.forEach(async (pinCode) => {
    console.log(pinCode);
    await fetch('http://127.0.0.1:4000/fetchData');
  });
};

const LandingPage = () => {
  const [pinCodes, setPinCodes] = useState('');
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pincodes"
        onChange={({ target }) => setPinCodes(target.value)}
      />
      <button type="button" onClick={() => fetchVaccineCenters(pinCodes)}>
        Submit
      </button>
    </div>
  );
};

export default LandingPage;
