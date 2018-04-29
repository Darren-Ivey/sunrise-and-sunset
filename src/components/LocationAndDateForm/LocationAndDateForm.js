import React, { Component } from 'react';
import { mapValues } from 'lodash/object';

class LocationAndDateForm extends Component {

    constructor (props) {
        super(props);
        this.fields = {};
    }

    gatherData () {
        return mapValues(this.fields, 'value');
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.onSubmit(this.gatherData());
    }

    renderInputError () {
        return (
            <div>
                <p>Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.</p>
            </div>
        )
    }

    renderServiceError () {
        return (
            <div>
                <p>Please try again.</p>
            </div>
        )
    }

    handleError () {
        if (this.props.error) {
            return this.props.error === 404 ? this.renderInputError() : this.renderServiceError();
        }
    }

    render () {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <fieldset>
                    <label className="field__label" htmlFor="postCode">Postcode</label>
                    <input required type="text" id="postCode" className="field__input field__input--text"  maxLength="8"
                           ref={ (c) => { this.fields.postcode = c; } } />
                    <label className="field__label" htmlFor="date">Date</label>
                    <input required type="date" id="date" className="field__input field__input--date"
                           ref={ (c) => { this.fields.date = c; } } />
                </fieldset>
                <footer>
                    { this.handleError() }
                    <button type="submit">Find</button>
                </footer>
            </form>
        )
    }
};

export default LocationAndDateForm;