export default class Calc {

    static getAvgFromArray (arr) {
        const numbers = arr.filter(i => !Number.isNaN(parseFloat(i)))
        const sum = numbers.reduce((acc, cur) => acc+cur, 0)
        return parseFloat( sum / numbers.length).toFixed(3)
    }

    static getPrice (distanceInKM, consumption, pricePerLiter) {
        return (distanceInKM / 100) * consumption * pricePerLiter
    }
}