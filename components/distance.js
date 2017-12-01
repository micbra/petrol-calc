export default class Distance {
    constructor (obj) {
        this.from = obj.from
        this.to = obj.to
    }

    getDistance (factor = 1000) {
        return this.getData()
            .then(data => data / factor)
            .catch(error => console.error(error))
    }

    getData () {
        const service = new google.maps.DistanceMatrixService
        const config = {
            origins: [this.from],
            destinations: [this.to],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC
        }
        
        return new Promise((resolve, reject) => {
            service.getDistanceMatrix(config, (response, status) => {
                if (status === 'OK') {
                    response.rows
                        .map(row => row.elements
                            .map(element => {
                                if (element.status === 'OK' && element.distance.value) {
                                    resolve(element.distance.value)
                                } else {
                                    reject(Error('There has been a Problem with location data: ' + element.status))
                                }

                            }))
                } else {
                    reject(Error('There has been an error : ' + status))
                }
            })
        })
    }
}