export function isStringEmpty(string) {
    string = string.trim()
    return string === "" || string === undefined || string === null
}