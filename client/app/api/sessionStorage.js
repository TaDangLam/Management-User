
export const JsonParse = (session) => {
    return JSON.parse(sessionStorage.getItem(`${session}`));
}