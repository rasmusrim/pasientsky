
class PatientService {

    static save(patient) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:3000/patients';

            if (patient.id) {
                url += '/' + patient.id
            }

            fetch(url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(patient)
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then(response => resolve(response));
                    } else {
                        reject(response.status);
                    }

                })
        })
    }

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
                            return patient;

                        });

                        resolve(patients);
                    });
                }).catch((reason) => {
                    reject(reason)
                })


        });
    }

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
                        resolve(patient);
                    });
                });



        });

    }

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