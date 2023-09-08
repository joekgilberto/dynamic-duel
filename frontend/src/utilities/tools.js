export function upperCase(string){
    let modifiedString = string.split('');
    modifiedString[0] = modifiedString[0].toUpperCase();
    modifiedString = modifiedString.join('')
    return modifiedString
}

export function searchString(string){
    let modifiedString = string.toLowerCase()
    modifiedString = modifiedString.split(' ')
    modifiedString = modifiedString.join("%20")
    modifiedString = modifiedString.split('\'')
    modifiedString = modifiedString.join("'%27")
    return modifiedString
}