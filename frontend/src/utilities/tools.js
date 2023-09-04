export function upperCase(string){
    let modifiedString = string.split('');
    modifiedString[0] = modifiedString[0].toUpperCase();
    modifiedString = modifiedString.join('')
    return modifiedString
}