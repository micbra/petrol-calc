import Autocomplete from './components/autocomplete.js'
import Distance from './components/distance.js'
import Geocode from './components/geocode.js'
import Petrol from './components/mtsk.js'
import Calc from './components/calc.js'

const inputs = new Autocomplete('.js-autocomplete')
const petrol = new Petrol('e0b02ec7-b3be-7811-3db0-776d9292a547')

// initialise input fields for autocomplete usage
inputs.init()

const renderPrice = price => {
    const container = document.querySelector('.result')
    container.innerHTML = ''
    
    const pricetag = document.createElement('strong')
    pricetag.innerHTML = `${price.toFixed(2)}€`
    container.appendChild(pricetag)
}

const findPetrolStations = (coords, type) => {
    return petrol.getStations(coords.lat.toFixed(3), coords.lng.toFixed(3), type[2])
}

const getPricesFromPetrolStations = data => {
    return new Promise((resolve, reject) => {
        if (data.ok && data.stations.length) {
            resolve(petrol.getPrices(data.stations))
        } else {
            reject(Error('There was a problem with the petrol prices api: ' + status))
        }
    })
}

const calcAndRenderPrice = (distance, consumption, prices) => {
    const price = Calc.getPrice(distance, consumption, Calc.getAvgFromArray(prices))
    renderPrice(price)
}

const checkForm = async () => {
    const values = []
    const formElements = document.querySelectorAll('.js-form-element')
    
    Array.from(formElements).map(element => {
        element.addEventListener('change', checkForm)
        values.push(element.value)
    })

    const isIncomplete = values.includes('')
    if (!isIncomplete) {
        // get distance from a to b
        const distance = new Distance({from: values[0], to: values[1]})

        const destinationCoords = new Geocode(values[1])
        
        try {
            // get LatLng from b and search there for petrol stations
            const coords = await destinationCoords.getCoords()
            const stations = await findPetrolStations(coords, values)
            const prices = await getPricesFromPetrolStations(stations)
            const distAB = await distance.getDistance(1000)
            calcAndRenderPrice(distAB, values[3], prices)
        } catch (err) {
            console.error(err)
        }
    }
}

checkForm()