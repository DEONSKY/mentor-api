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
    return `${names[ Math.floor( Math.random() * 20 )]} ${surnames[ Math.floor( Math.random() * 20 )]}`
}

export const generatePassword = () => {

    return
}

export const generateEmail = () => {
    return
}
//#endregion user table

//#region data set table
export const generateTitle = () => {
    return
}

export const generateDataType = () => {
    return
}

export const generateDescription = () => {
    return
}
//#endregion data set table

//#region email confimation table
export const generateEmailTokenValue = () => {
    return
}
//#endregion email confimation table

//#region data table
export const generateDataValue = () => {
    return Math.random()*9999999
}
//#endregion data table

//#region token table
export const generateIpAddress = () => {
    return
}
//#endregion token table

export default {
    generateFullName
}