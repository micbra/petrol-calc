export default class Geocode {
    constructor (address) {
        this.address = address
    }

    getCoords () {
        return this.getData()
            .then(data => ({
                lat: data[0].geometry.location.lat(),
                lng: data[0].geometry.location.lng()
            }))
            .catch(error => error)
    }

    getData () {
        const service = new google.maps.Geocoder()
        
        return new Promise((resolve, reject) => {
            service.geocode({'address': this.address}, (response, status) => {
                if (status === 'OK') {
                    resolve(response)
                } else {
                    reject(Error('There has been an error aquiring geocode data:', status))
                }
            })
        })
    }
}