import React, { Component } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
import PatientService from '../../services/PatientService';
import NotificationService from '../../services/NotificationService';
import Moment from 'react-moment';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class Search extends Component {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            query: '',
            patients: [],
            showLoader: false
        }

        this.queryChanged = this.queryChanged.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    /**
     * Handles changes in the query input field and triggers a search if no further changes are made within 1000ms.
     * 
     * @param {Event} event 
     */    
    queryChanged(event) {
        this.setState({ showLoader: true });

        const query = event.target.value;

        this.setState({ query: query });

        clearTimeout(this.state.timeout);

        let timeout = setTimeout(() => {
            this.doSearch()
        }, 1000);
        this.setState({ timeout: timeout });


    }

    /**
     * Searches for patients matching the query.
     */
    doSearch() {
        if (!this.state.query) {
            this.setState({ showLoader: false, patients: [] });
        } else {

            PatientService.searchForPatient(this.state.query).then(response => {
                this.setState({ showLoader: false, patients: response })

            });
        }
    }

    /**
     * Delete a patient.
     * 
     * @param {number} id 
     */
    delete(id) {
        let patient = this.state.patients.find(element => element.id === id);

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete ' + patient.name + '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        PatientService.delete(id).then(() => {
                            let patients = this.state.patients;
                            patients = patients.filter(element => element.id !== id)

                            this.setState({ patients: patients });
                            NotificationService.success('User deleted');
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }

    /**
     * Opens up the edit patient form for the patient with a given ID.
     * 
     * @param {number} id 
     */
    edit(id) {
        this.props.history.push('/edit-user/' + id)
    }

    /**
     * Renders the component.
     */
    render() {
        let items;
        let warning;

        if (this.state.patients.length > 0) {
            items = this.state.patients.map((item) =>
                <tr key={item.id}>
                    <td>
                        <button onClick={() => this.edit(item.id)}>
                            Edit
                        </button>
                        <button onClick={() => this.delete(item.id)}>
                            Delete
                        </button>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><Moment format="DD-MM-YYYY">{item.dob}</Moment></td>
                </tr>

            );
        } else {
            warning = 'No patients were found.'
        }

        let loader;
        if (this.state.showLoader) {
            loader = (<Loader
                type="BallTriangle"
                color="#00BFFF"
                height={30}
                width={30}

            />);

        }

        return (
            <div>
                <h1>Search</h1>

                Query:
                <input type="text" name="query" value={this.state.query} onChange={this.queryChanged} />
                {loader}

                <table>
                    <thead>
                        <tr>
                            <td>Actions:</td>
                            <td>Name:</td>
                            <td>Email:</td>
                            <td>Phone:</td>
                            <td>DoB:</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>{warning}</td></tr>
                        {items}
                    </tbody>
                </table>

            </div>

        );
    }


}

export default Search;