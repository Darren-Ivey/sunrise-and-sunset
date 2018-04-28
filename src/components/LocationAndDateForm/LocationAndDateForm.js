import React, { Component } from 'react';
import { mapValues } from 'lodash/object';

class LocationAndDateForm extends Component {

    constructor(props) {
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

    render () {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <fieldset>
                    <label className="field__label" htmlFor="postCode">Postcode</label>
                    <input required type="text" id="postCode" className="field__input field__input--text"  maxLength="6"
                           ref={ (c) => { this.fields.reference = c; } } />
                    <label className="field__label" htmlFor="date">Date</label>
                    <input required type="date" id="date" className="field__input field__input--date"
                           ref={ (c) => { this.fields.reference = c; } } />
                </fieldset>
                <footer>
                    <button type="submit">Find</button>
                </footer>
            </form>
        )
    }
};

export default LocationAndDateForm;