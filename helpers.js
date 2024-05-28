module.exports = {

    // function to perform operation of an object
    forEach: (value, options) => {
        let sum = 0;
        let out = '<div>';

        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            sum += parseInt(options.fn(element))
        }
        console.log(isNaN(sum));

        out += sum + '<div>';
        return out;

    },

    // Function to compare two value
    ifIqual: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }

    },
}