export const sortPostsHelper = (posts, sortedBy) => {
    return posts.sort((a, b) => {
        if (sortedBy === 'date_desc') {
            return a.timestamp - b.timestamp
        } else if (sortedBy === 'date_asc') {
            return b.timestamp - a.timestamp
        } else if (sortedBy === 'score_desc') {
            return a.voteScore < b.voteScore
        } else if (sortedBy === 'score_asc') {
            return a.voteScore > b.voteScore
        }
    })
}

export const sortHelper = (arr, field, desc=1) => {
    return arr.sort((a, b) => {
        if (desc) {
            return b[field] - a[field];
        } else {
            return a[field] - b[field];
        }
    })
}

/**
 * Converts an object with ids and values into an array of the values,
 *  useful for the posts architecture we are using
 * @param {object} object
 */
export const objectToArray = (object) => Object.values(object).map(p => p);

/**
 * Converts an array into an object which keys are the key/id of an array
 * and the values the whole item in the array
 * TODO: make the id a field param
 * @param {object} object
 */
export const arrayToObject = (array) => {
    return array.reduce((acc, item) => {
        return {
            ...acc,
            ...{[item.id] : item}
        }
    }, {});
}

export const DateUtils = {
    parseDatetime: (timestamp) =>  new Date(timestamp).toLocaleString()
}