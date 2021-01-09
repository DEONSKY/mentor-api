//#region user table
export const generateFullName = () => {
    let names = [
        'Cecil', 'Curry',
        'Leslie', 'Harvey#',
        'Janet', 'Collier',
        'Sara', 'Cook',
        'Ia!n', 'Mcguire',
        'Maria', 'Byrd',
        'Winifred', 'Kim',
        'Geneva', 'Morrison',
        'Erin', 'Joseph',
        'Devin', 'Yates',
    ]
    let surnames = [
        'Eileen', 'Dennis',
        'Shaun', 'Estrada',
        'Tom', 'Edwards',
        'Christina', 'Walsh',
        'Angelica', 'Hodges',
        'Naomi', 'West',
        'Rene', 'Reyes',
        'Stewart', 'Gardner',
        'Debbie', 'Townsend',
        'Karl', 'Howard',
    ]
    return `${names[Math.floor(Math.random() * 20)]} ${surnames[Math.floor(Math.random() * 20)]}`
}

export const generatePassword = () => {

    return generateRandomString(Math.random() * 15)
}

export const generateEmail = () => {
    return `${generateRandomString(Math.random() * 8)}${Math.random() * 10 >1 ? '@' : generateRandomString(1)}${generateRandomString(Math.random() * 8)}.com`
}
//#endregion user table

//#region data set table
export const generateTitle = () => {
    return 'bos'
}

export const generateDataType = () => {
    return 'bos'
}

export const generateDescription = () => {
    return 'bos'
}
//#endregion data set table

//#region email confimation table
export const generateEmailTokenValue = () => {
    return generateRandomString(Math.random() * 35)
}
//#endregion email confimation table

//#region data table
export const generateDataValue = () => {
    return Math.random() * 9999999
}
//#endregion data table

//#region token table
export const generateIpAddress = () => {
    return Math.floor(Math.random() * 257) + "." + Math.floor(Math.random() * 257) + "." + Math.floor(Math.random() * 257) + "." + Math.floor(Math.random() * 257)
}
//#endregion token table

const generateRandomString = (pLength) => {
    var keyListAlpha = "abcdefghijklmnopqrstuvwxyz",
        keyListInt = "123456789",
        keyListSpec = "!@#?",
        password = '';
    var len = Math.ceil(pLength);
    len = len - 1;
    var lenSpec = pLength - 2 * len;

    for (let i = 0; i < len; i++) {
        password += keyListAlpha.charAt(Math.floor(Math.random() * keyListAlpha.length));
        password += keyListInt.charAt(Math.floor(Math.random() * keyListInt.length));
    }

    for (let i = 0; i < lenSpec; i++)
        password += keyListSpec.charAt(Math.floor(Math.random() * keyListSpec.length));

    password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');

    return password;
}

// console.log('\nFull name         :\t', generateFullName())
// console.log('\nPassword          :\t', generatePassword())
// console.log('\nEmail             :\t', generateEmail())
// console.log('\nTitle             :\t', generateTitle())
// console.log('\nData Type         :\t', generateDataType())
// console.log('\nDescription       :\t', generateDescription())
// console.log('\nEmail Token Value :\t', generateEmailTokenValue())
// console.log('\nData Value        :\t', generateDataValue())
// console.log('\nIp Address        :\t', generateIpAddress())


export default {
    generateFullName,
    generatePassword,
    generateEmail,
    generateTitle,
    generateDataType,
    generateDescription,
    generateEmailTokenValue,
    generateDataValue,
    generateIpAddress
}