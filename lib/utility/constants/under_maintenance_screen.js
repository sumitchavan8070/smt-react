import React from 'react';
import { ReactComponent as UnderMaintenanceIllustration } from '../../../assets/svg_image/svg_file';
import {UnderMaintenanceSVG } from "../../../assets/svg_image/svg_file"; 
 UnderMaintenanceScreen = () => {


  return (
    <div className="under-maintenance-screen">
      <div className="spacer"></div>
      <div className="spacer"></div>
      <UnderMaintenanceSVG/>
      <ErrorInfo
        title="Under Maintenance!"
        description="We are currently performing scheduled maintenance. Please check back later. Thank you for your patience."
        btnText="Retry"
        
      />
    </div>
  );
};

const ErrorInfo = ({ title, description, btnText, press }) => {
  return (
    <div className="error-info">
      <h1>{title}</h1>
      <p>{description}</p>
      <button className="retry-button" onClick={press}>
        {btnText}
      </button>
    </div>
  );
};

// Styles

const styles = `
.under-maintenance-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  padding: 16px;
}

.spacer {
  flex: 2;
}

.svg-container {
  width: 80%;
  max-width: 400px;
}

.error-info {
  text-align: center;
  max-width: 400px;
}

.retry-button {
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.retry-button:hover {
  background-color: darkgray;
}
`;



export default UnderMaintenanceScreen;
