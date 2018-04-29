import React from 'react';
import './SunActivity.css';

const SunActivity = ({ sunrise, sunset }) => {
    const render = () =>
        <div className="sun-activity-results">
            <div className="sun-activity-results__result">
                Your sunrise: <span className="sun-activity-results__value">{ sunrise }</span>
            </div>
            <div className="sun-activity-results__result">
                Your sunset: <span className="sun-activity-results__value">{ sunset }</span>
            </div>
        </div>

    return sunrise && sunset ? render() : null;
};

export default SunActivity;