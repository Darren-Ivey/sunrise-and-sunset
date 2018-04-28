import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserSunriseAndSunset, getCoordinates } from '../modules/sunActivity';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import './SunActivityPage.css';

class SunActivityPage extends Component {
    render () {
        const { getCoordinates, userSunriseAndSunset } = this.props;
        return (
            <div className="page page__sun-activity">
                <LocationAndDateForm
                    getCoordinates={ getCoordinates } />
                <SunActivity
                    userSunriseAndSunset={ userSunriseAndSunset }/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userSunriseAndSunset: getUserSunriseAndSunset(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCoordinates: (data) => dispatch(getCoordinates(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SunActivityPage);