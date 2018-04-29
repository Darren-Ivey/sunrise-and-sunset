import React from 'react';

const SunActivity = ({ sunrise, sunset }) =>
    <div className="sun-activity-results">
        <div className="sun-activity-results__result">
            Sunrise: { sunrise }
        </div>
        <div className="sun-activity-results__result">
            Sunset: { sunset }
        </div>
    </div>

export default SunActivity;