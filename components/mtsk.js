export default class MTSK {
    constructor (key) {
        this.key = key
        this.radius = 10
    }

    getPrices (stationsArray) {
        return stationsArray.map(station => station.price)
    }

    getStations (lat, lng, type = 'all') {
        return fetch(`https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${this.radius}&sort=dist&type=${type}&apikey=${this.key}`)
            .then(data => data.json())
    }
}