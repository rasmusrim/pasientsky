import React, { Component } from 'react';
import PatientService from '../../services/PatientService';
import NotificationService from '../../services/NotificationService';
import moment from 'moment';

class PatientForm extends Component {
    constructor() {
        super()

        this.state = { formControls: {} };
        this.submit = this.submit.bind(this);

    }
    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({ patientEdited: id })

        PatientService.getPatientById(id).then(patient => {
            console.log(patient.dob)

            this.setState({
                formControls: {
                    name: patient.name,
                    email: patient.email,
                    phone: patient.phone,
                    dob: moment(patient.dob).format('YYYY-MM-DD')


                }
            });
        });
    }

    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({ formControls: { ...this.state.formControls, [name]: value } })
    }

    async submit(event) {
        event.preventDefault();

        let patient = this.state.formControls;

        if (this.state.patientEdited) {
            patient.id = this.state.patientEdited;
        }

        PatientService.save(patient);
        NotificationService.success('User saved');

        this.resetForm();
    }

    resetForm() {
        this.setState({
            formControls: {
                name: '',
                email: '',
                date: '',
                phone: ''
            }
        })
    }

    render() {
        let header;
        if (this.state.patientEdited) {
            header = 'Edit patient';
        } else {
            header = 'Add new patient'
        }

        return (
            <div>
                <h1>{header}</h1>
                <form>
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
                        <input type="number"
                            name="phone"
                            value={this.state.formControls.phone}
                            onChange={this.changeHandler}
                            required
                        />
                    </p>

                    <p>
                        <input type="submit" onClick={this.submit} value="Save" />
                    </p>
                </form>
            </div>
        );
    }
}

export default PatientForm;