export default class Autocomplete {
    constructor (selector) {
        this.selector = selector
    }

    handleInput (input) {
        const autocomplete = new google.maps.places.Autocomplete(input)
    }

    init (selector) {
        const elements = Array.from(document.querySelectorAll(this.selector))
        elements.map(this.handleInput)

        return elements.length
    }
}