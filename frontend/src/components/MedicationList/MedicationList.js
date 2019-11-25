import React, { Component } from 'react';
import MedicationService from '../../services/MedicationService';

class MedicationList extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            medications: [],
            query: ''
        }

        this.findMedication = this.findMedication.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addMedication = this.addMedication.bind(this);
    }


    componentDidUpdate() {
        this.medicationUpdateTrigger = this.props.onUpdate;
    }

    /**
     * The function which looks after all changes in the form and saves it in the state.
     */
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value })
    }

    async findMedication() {
        let results = await MedicationService.search(this.state.query)
        this.setState({ searchResults: results })
    }

    addMedication() {
        let parts = this.state.searchResultsList.split("|");
        let id = parts[0];
        let name = parts[1];

        let medications = this.state.medications;
        medications.push({ id: id, name: name });

        this.setState({ medications: medications });
        this.medicationUpdateTrigger(medications);
    }

    render() {
        let searchResults = this.state.searchResults.map((item) =>
            <option value={item.id + "|" + item.productName} key={item.id}>{item.productName}</option>
        );

        let selectedMedications = this.state.medications.map((medication) =>
            <li>{medication.name}</li>
        );


        return (
            <div>
                <p>
                    Search for medication: <br />
                    <input type="text" onChange={this.changeHandler} value={this.state.query} name="query" />
                    <input type="button" onClick={this.findMedication} value="Search" />
                </p>
                <p style={this.state.searchResults.length ? { display: 'block' } : { display: 'none' }}>
                    <select name="searchResultsList" onChange={this.changeHandler}>
                        <option value="">-= Please select a medication =-</option>
                        {searchResults}
                    </select>
                    <input type="button" value="Add" onClick={this.addMedication} style={this.state.searchResultsList ? { display: 'block' } : { display: 'none' }} />

                </p>

                <ul>
                    {selectedMedications}
                </ul>

            </div>

        );
    }

}

export default MedicationList;