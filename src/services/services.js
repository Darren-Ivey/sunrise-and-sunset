

const getOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
};

export const fetchCoordinates = ({ postCode }) => {
    return fetch(`api.postcodes.io/postcodes?q=${ postCode }`, getOptions)
        .then(r => r.json())
        .catch(error => console.log({
            code: error
        }))
};