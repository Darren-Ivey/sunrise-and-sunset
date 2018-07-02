// @flow

import * as moment from 'moment';
import * as React from 'react';
import './SunActivity.css'


type Props = {
    sunActivity: {
        sunrise: string,
        sunset: string
    }
}

const SunActivity = ( props: Props) => {
    const { sunrise, sunset } = props.sunActivity;
    const render = () => {
        return (
            <div className="sun-activity-results">
                <div className="sun-activity-results__result">
                    Your sunrise: <span className="sun-activity-results__value">{moment(sunrise).format("HH:mm")}</span>
                </div>
                <div className="sun-activity-results__result">
                    Your sunset: <span className="sun-activity-results__value">{moment(sunset).format("HH:mm")}</span>
                </div>
            </div>
        )
    };
    return (sunrise && sunset) ? render() : null;
};

export default SunActivity;