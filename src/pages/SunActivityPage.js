import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getError, getSunrise, getSunset, submitLocationAndDateForm } from '../modules/sunActivity';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import './SunActivityPage.css';

class SunActivityPage extends Component {
    render () {
        const { onSubmit, sunrise, sunset, error } = this.props;
        return (
            <div className="page-sun-activity">
                <h1 className="page-sun-activity__header">
                    Sunrise and Sunset
                </h1>
                <LocationAndDateForm
                    onSubmit={ onSubmit }
                    error={ error } />
                <SunActivity
                    sunrise={ sunrise }
                    sunset={ sunset } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sunrise: getSunrise(state),
        sunset: getSunset(state),
        error: getError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => dispatch(submitLocationAndDateForm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SunActivityPage);