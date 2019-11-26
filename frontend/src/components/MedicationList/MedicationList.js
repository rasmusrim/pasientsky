import React, { Component } from 'react';
import MedicationService from '../../services/MedicationService';

class MedicationList extends Component {
    /**
     * Constructor
     */
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
        this.removeMedication = this.removeMedication.bind(this);
    }

    /**
     * ComponentDidUpdate.
     * 
     * @param {*} prevProps 
     * @param {*} prevState 
     * @param {*} snapshot 
     */
    componentDidUpdate(prevProps) {
        this.medicationUpdateTrigger = this.props.onUpdate;

        if (this.props.medications && (this.props.medications !== prevProps.medications)) {
            this.setState({ medications: this.props.medications })
        }


    }

    /**
     * The function which looks after all changes in the form and saves it in the state.
     */
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value })
    }

    /**
     * Uses the MedicationService to search for medications.
     */
    async findMedication() {
        let results = await MedicationService.search(this.state.query)
        this.setState({ searchResults: results })
    }

    /**
     * Adds the selected medication to the list of medications.
     */    
    addMedication() {
        let parts = this.state.searchResultsList.split("|");
        let id = parts[0];
        let name = parts[1];

        let medications = this.state.medications;
        medications.push({ id: id, name: name });

        medications = this.sortMedications(medications);
        this.setState({ medications: medications });
        
        this.medicationUpdateTrigger(medications);
    }

    /**
     * Removes a medication with a specific ID from the list.
     * 
     * @param {String} id The ID of the medication to be removed
     */
    removeMedication(id) {
        let medications = this.state.medications;

        medications = medications.filter((medication) => {
            if (medication.id === id) {
                return false;
            } else {
                return true;
            }


        })

        this.setState({ medications: medications });
        this.medicationUpdateTrigger(medications);

    }

    /**
     * Sorts medications alphabetically
     * 
     * @param {Array} medications 
     */
    sortMedications(medications) {

        medications = medications.sort(function(x, y) {
            return x.name.localeCompare(y.name);
        });

        return medications;

        
    }

    /**
     * Renders component
     */
    render() {
        let searchResults = this.state.searchResults.map((item) =>
            <option value={item.id + "|" + item.productName} key={item.id}>{item.productName}</option>
        );

        let selectedMedications = this.state.medications.map((medication) =>
            <li key={medication.id}>{medication.name} <input type="button" value="Remove" onClick={() => this.removeMedication(medication.id)} /></li>
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