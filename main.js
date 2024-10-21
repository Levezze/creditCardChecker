// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// Added Cards
const new1 = '4532253788794840910'
const new2 = '5105408756515654'
const new3 = '375606363483117'
const new4 = '6011589194609745'
const new5 = '6011558959457044034'

const newArray = [new1, new2, new3, new4, new5];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// Turn Numbers To Arrays
const numToArr = (arr) => {
    const strArr = arr.map(number => Array.from(number));
    return strArr.map(str => {
        return str.map(num => parseInt(num))
    });
};

const fixedNewArray = numToArr(newArray);

// Join Credit Card Arrays
const newBatch = batch.concat(fixedNewArray);

// Validate Card
const validateCred = array => {
    const valArr = [];
    let count = 1;
    for (let i = array.length - 1; i >= 0; i--) {
        let testNumber = array[i];
        if (count % 2 === 0) {
            testNumber *= 2;
            if (testNumber > 9) {
                testNumber -= 9;
            }
        }
        valArr.push(testNumber);
        count += 1;
    }
    const sum = valArr.reduce((a,b) => a + b, 0);
    if (sum % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

// Find Invalid Cards In Nested Arrays
const findInvalidCards = arrays => {
    const invalidArray = arrays.filter(array => !validateCred(array));
    return invalidArray;
}

// Return Company Names With Invalid Cards
const idInvalidCardCompanies = arrays => {
    const companies = []
    for (let array of arrays) { // could be arrays.map with return values (instead of pushing to array)
        const firstDigit = array[0];
        switch (firstDigit) {
            case 3:
                companies.push('Amex (American Express)');
                break;
            case 4:
                companies.push('Visa');
                break;
            case 5:
                companies.push('Mastercard');
                break;
            case 6:
                companies.push('Discover');
                break;
            default:
                console.log('Company not found.');
                break;
        }
    }
    return companies;
}

// Fix Invalid Card
const FixCred = array => {
    const valArr = [];
    let count = 1;
    for (let i = array.length - 1; i >= 0; i--) {
        let testNumber = array[i];
        if (count % 2 === 0) {
            testNumber *= 2;
            if (testNumber > 9) {
                testNumber -= 9;
            }
        }
        valArr.push(testNumber);
        count += 1;
    }
    const sum = valArr.reduce((a,b) => a + b, 0);
    const modSum = sum % 10;
    if (modSum !== 0) {
        let firstDigit = array[array.length - 1];
        const modDiff = 10 - modSum;
        if (firstDigit + modDiff >= 10) {
            firstDigit -= modSum;
        } else {
            firstDigit += modDiff;
        }
        array[array.length - 1] = firstDigit;
    }
    return array;
}

// Apply Credit Numbers Fix
const applyFix = true;

// Apply Fix On All Arrays
const cardsApplyFix = arr => {
    arr.map((fix) => FixCred(fix));
};

if (applyFix) {
    cardsApplyFix(newBatch);
}

// Find Invalid Cards
const invCardsArr = findInvalidCards(newBatch);

// Set of Companies
const CardCompanies = [...new Set(idInvalidCardCompanies(invCardsArr))];

console.log(CardCompanies);

// Test If New Cards Are Invalid (Empty === Good)
const NewInvTest = findInvalidCards(fixedNewArray);
console.log(NewInvTest)

