
const catchError = (response) => {
    if (!response.ok) {
        throw { error: response.status };
    }
    return response;
};

const getOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
};

export const fetchCoordinates = ({ postcode }) =>
    fetch(`https://api.postcodes.io/postcodes/${ postcode }`, getOptions)
        .then(catchError)
        .then(r => r.json())