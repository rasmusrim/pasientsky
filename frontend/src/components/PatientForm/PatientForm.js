import React, { Component } from 'react';
import PatientService from '../../services/PatientService';
import NotificationService from '../../services/NotificationService';
import moment from 'moment';

import MedicationList from '../MedicationList/MedicationList';

class PatientForm extends Component {
    /**
     * Constructor
     */
    constructor() {
        super()

        this.state = {
            formControls: {
                medications: [],
                name: '',
                email: '',
                dob: '',
                phone: ''
            }
        };

        this.submit = this.submit.bind(this);
        this.updatedMedicationList = this.updatedMedicationList.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.form = React.createRef();

    }

    /**
     * Set up component
     */
    componentDidMount() {
        let id = this.props.match.params.id;
        if (!id) {
            this.resetForm();
        } else {

            this.setState({ patientEdited: id })

            PatientService.getPatientById(id).then(patient => {
                this.setState({
                    formControls: {
                        name: patient.name,
                        email: patient.email,
                        phone: patient.phone,
                        dob: moment(patient.dob).format('YYYY-MM-DD'),
                        medications: patient.medications


                    }
                });
            });
        }
    }

    /**
     * The function which looks after all changes in the form and saves it in the state.
     * 
     * @param {Event} event 
     */
    changeHandler(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({ formControls: { ...this.state.formControls, [name]: value } })
    }

    /**
     * Handles saving the patient.
     * 
     * @param {Event} event 
     */
    async submit(event) {
        event.preventDefault();

        if (this.form.current.reportValidity()) {

            let patient = this.state.formControls;

            if (this.state.patientEdited) {
                patient.id = this.state.patientEdited;
            }

            PatientService.save(patient).then(savedPatient => {
                NotificationService.success('Patient saved');

                if (!this.state.patientEdited) {
                    this.props.history.push('/edit-user/' + savedPatient.id)
                }
            }).catch((response) => {
                NotificationService.error('Something went wrong: ' + response.errors[0].msg);
            });
        }
    }


    /**
     * Resets all inputs in form
     */
    resetForm() {
        this.setState({
            formControls: {
                name: '',
                email: '',
                date: '',
                phone: '',
                medications: []
            }
        })
    }

    /**
     * Callback function from MedicationsList. Called when medications are updated from child component.
     * 
     * @param {Array} medications 
     */
    updatedMedicationList(medications) {
        this.setState({ formControls: { ...this.state.formControls, medications: medications } })
    }

    /**
     * Shows the form
     */
    render() {
        let header;
        if (this.state.patientEdited) {
            header = 'Edit patient';
        } else {
            header = 'Add new patient'
        }

        return (
            <div>
                <h1>{header}  {this.state.formControls.name}</h1>
                <form ref={this.form}>
                    <p>
                        Navn:<br />
                        <input type="text"
                            name="name"
                            value={this.state.formControls.name}
                            onChange={this.changeHandler}
                            required
                        />
                    </p>

                    <p>
                        E-post:<br />
                        <input type="email"
                            name="email"
                            value={this.state.formControls.email}
                            onChange={this.changeHandler}
                            required
                        />
                    </p>

                    <p>
                        Fødselsdato:<br />
                        <input type="date"
                            name="dob"
                            value={this.state.formControls.dob}
                            onChange={this.changeHandler}
                            required
                        />
                    </p>

                    <p>
                        Telefonnummer:<br />
                        <input type="text"
                            name="phone"
                            value={this.state.formControls.phone}
                            onChange={this.changeHandler}
                            required
                            pattern="\d{8}"
                        />
                    </p>

                    <MedicationList onUpdate={this.updatedMedicationList} medications={this.state.formControls.medications} />

                    <p>
                        <input type="submit" onClick={this.submit} value="Save" />
                    </p>
                </form>
            </div>
        );
    }
}

export default PatientForm;