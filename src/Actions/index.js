import fetch from 'isomorphic-fetch'

export const REQUEST_VACANCIES = 'REQUEST_VACANCIES'
export const RECEIVE_VACANCIES = 'RECEIVE_VACANCIES'
export const RECEIVE_TOP_RUBRICS = 'RECEIVE_TOP_RUBRICS'
export const RECEIVE_TOP_WORDS = 'RECEIVE_TOP_WORDS'

function requestVacancies() {
    return {
        type: REQUEST_VACANCIES,
    }
}

function receiveTopWords(words) {
    return {
        type: RECEIVE_TOP_WORDS,
        words,
    }
}

function receiveVacancies(vacancies) {
    return {
        type: RECEIVE_VACANCIES,
        vacancies,
    }
}

function receiveTopRubrics(rubrics) {
    return {
        type: RECEIVE_TOP_RUBRICS,
        rubrics,
    }
}

function topVacancies() {
    return (dispatch, getState) => {
        const top = []
        const vacanciesArr = getState().vacancies

        vacanciesArr.forEach((vacancie) => {
            vacancie.rubrics.forEach((rubrica) => {
                const haveRubrica = top.find(topRubrica => topRubrica.id === rubrica.id)
                if (haveRubrica) {
                    haveRubrica.vacancies.push({...vacancie})
                } else {
                    top.push({id: rubrica.id, title: rubrica.title, vacancies: [{...vacancie}]})
                }
            })
        })
        top.sort((a, b) => b.vacancies.length - a.vacancies.length)
        dispatch(receiveTopRubrics(top))
    }
}

function topWords() {

    return (dispatch, getState) => {
        const wordsObj = {}
        const vacanciesArr = getState().vacancies
        const allWords = vacanciesArr
            .reduce((prevStr, vacancie) => `${prevStr} ${vacancie.header.toLowerCase()}`, '')
            .replace(/(\.|,|\\|\/|\(|\)|-)/g, ' ')
            .trim()
            .split(/\s/)

        allWords.forEach((word) => {
            if (wordsObj[word]) wordsObj[word] += 1
            else wordsObj[word] = 1
        })

        const words = Object.keys(wordsObj).map(key => ({title: key, count: wordsObj[key]}))

        words.sort((a, b) => b.count - a.count)

        dispatch(receiveTopWords(words))
    }
}

export function fetchVacancies() {
    const esc = encodeURIComponent
    const api = 'https://api.zp.ru/v1/vacancies/?'
    const params = {
        period: 'today',
        is_new_only: true,
        limit: 50,
        geo_id: 826
    }
    const paramsString = Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&')
    const queryString = api + paramsString

    return async (dispatch) => {
        dispatch(requestVacancies())
        await fetch(queryString)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else {
                    throw new Error('Server response was not ok.')
                }
            })
            .then(json => {
                let vacanciesArr = json.vacancies;

                dispatch(receiveVacancies(vacanciesArr))
                dispatch(topVacancies())
                dispatch(topWords())
            })
            .catch(e)
        {
            console.error(e)
        }
    }
}