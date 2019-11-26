
class PatientService {

    /**
     * Saves a patient.
     * 
     * @param {Patient} patient 
     */
    static save(patient) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:3000/patients';

            if (patient.id) {
                url += '/' + patient.id
            }
            
            let patientClone = JSON.parse(JSON.stringify(patient))

            patientClone.medications = JSON.stringify(patientClone.medications);

            fetch(url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(patientClone)
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then(response => resolve(response));
                    } else {
                        response.json().then(response => reject(response));
                    }

                })
        })
    }

    /**
     * Searches for patients matching the query.
     * 
     * @param {String} query 
     */
    static searchForPatient(query) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/patients?query=' + query,
                {
                    headers: {
                        'Accept': 'application/json',
                    },
                }).then((response) => {
                    response.json().then(patients => {
                        patients = patients.map((patient) => {
                            patient.dob = new Date(patient.dob);
                            patient.medications = JSON.parse(patient.medications);

                            return patient;

                        });

                        resolve(patients);
                    });
                }).catch((reason) => {
                    reject(reason)
                })


        });
    }

    /**
     * Gets the patient with the given ID.
     * 
     * @param {number} id 
     */
    static getPatientById(id) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/patients/' + id,
                {
                    headers: {
                        'Accept': 'application/json',
                    },
                }).then((response) => {
                    response.json().then(patient => {
                        patient.dob = new Date(patient.dob);
                        patient.medications = JSON.parse(patient.medications);
                        resolve(patient);
                    });
                });



        });

    }

    /**
     * Deletes the patient with the given ID.
     * 
     * @param {number} id 
     */
    static delete(id) {
        return new Promise((resolve, reject) => {

            fetch('http://localhost:3000/patients?id=' + id,
                {
                    headers: {
                        'Accept': 'application/json',
                    },
                    method: "DELETE",
                }).then((response) => {
                    if (response.status === 200) {
                        resolve();
                    } else {
                        reject(response.status);
                    }

                });
        });


    }

}

export default PatientService;