class MedicationService {

    /**
     * Searches the medication API for a medication matching the query
     * 
     * @param {String} query The string to search for.
     */
    static search(query) {
        return new Promise((resolve, reject) => {
            fetch('http://fest-searcher.herokuapp.com/api/fest/s/' + query)
                .then(response => {
                    response.json().then(response => resolve(response))
                }).catch(() => reject())
        })
    }

}

export default MedicationService;