const { PDFDocument } = require('pdf-lib');
const FS = require('fs');
const Transacao = require('./models/Transacao');


module.exports = {

    // function helpers to sum te gotten values througth transation =====================
    forCrfValueSum: (trans, options) => {
        let sum = 0;
        let out = '<div>';

        for (let i = 0; i < trans.length; i++) {
            const element = trans[i];
            sum += parseInt(options.fn(element));
        }

        // Number Format for Money
        const maney = new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
        }).format(sum)

        // Output
        out += maney + options.fn(this) + '</div>';
        return out;

    }, // Helper End ===================================================================


    //Helper to calculate de pursentage of transation ==================================
    transPurcetage: (trans, value, options) => {
        let valueGoal = value;    // value needed
        let totalValue = 0;       // going to receive the total of gotten value
        let purcentage_value = 0; // going to calculate these gotten value into purcentage

        // Going to get each crowdfunding transation and sum of all transation value
        for (let i = 0; i < trans.length; i++) {

            const transation = trans[i];
            totalValue += transation.valor

        } // for End

        //Condition to calculete the purcent of the gotten "valor" 
        if (totalValue <= valueGoal) {
            purcentage_value = (totalValue * 100) / valueGoal;
        } else {
            purcentage_value = 100;
        }

        // Output
        return purcentage_value + options.fn(this);

    }, // Helper End ===================================================================


    // Function to compare two value ===================================================
    ifIqual: (v1, v2, options) => {
        if (v1 == v2) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }

    }, // Helper End ==================================================================== 

    // Function to compare two value ===================================================
    MajorThen: (v1, v2, options) => {
        if (v1 > v2) {
            return options.fn(this)
        }

    }, 
    
    MinorThen: (v1, v2, options) => {
        if (v1 < v2) {
            return options.fn(this)
        }

    }, 
    
    // Helper End ==================================================================== 



    // HELPER TO CALACULATE DURATION OF A CROWDFUNDIG ===================================
    crowdDuration: (date, duracao, options) => {

        // Getting the startin data
        const startDate = new Date(date);
        const endtDate = new Date(duracao);
        const toDay = new Date();

        // Calculete the difference in milleiseconds between "startDate" and "endDate"
        const durationInMilliseconds = endtDate - startDate;
        // Calculete the difference in milleiseconds between "startDate" and "toDay"
        const consumedDaysInMilliseconds = toDay - startDate;

        // Convert millisencods per day
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const duration = Math.round(durationInMilliseconds / millisecondsPerDay);
        const daysPast = Math.round(consumedDaysInMilliseconds / millisecondsPerDay);
        const restDay = duration - daysPast;

        // Output
        return restDay + options.fn(this);

    }, // HELPER END ======================================================================


    // HELPER FOR NUMBER FORMAT ===========================================================
    NumberFormat: (value, options) => {

        const money = new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
        }).format(value);

        return money + options.fn(this);
    }, // HELPER END ======================================================================


    // HELPER FOR TRUNCATE TEXT ===========================================================
    TruncateText: (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    }, // HELPER END =======================================================================

 

    // HELPER TO READ PDF  ===========================================================
    readPDF: async (value, options) => {

        const id = value;

        for (let i = 0; i < value.length; i++) {
            const element = array[i];

            const item = await Transacao.findOne({ where: { id: id } });
            console.log(item);


        }

        // const comprovativo = item.comprovativo;
        // const pdfPath = `public/site/pdfs/comprovativos/${comprovativo}`;
        // const pdfBytes = FS.readFileSync(pdfPath);

        // const pdfDoc = await PDFDocument.load(pdfBytes);
        // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })

        return value;
    }, // HELPER END =======================================================================


    //HELPER TO FORMAT GREAT NUMBERS =======================================================
    NumFormat: (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B';
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(1) + 'K';
        } else {
            return number.toString();
        }
    }
    //HELPER END ===========================================================================
} // END MODULE BLOCK

