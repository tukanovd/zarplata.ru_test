import {
    RECEIVE_VACANCIES,
    REQUEST_VACANCIES,
    RECEIVE_TOP_RUBRICS,
    RECEIVE_TOP_WORDS,
} from '../actions'

const initialState = {
    vacancies: [],
    topRubrics: [],
    loadingTopRubrics: true,
    loadingTopWords: true,
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_VACANCIES:

            return {
                ...state,
                vacancies: [...action.vacancies],
            }

        case REQUEST_VACANCIES:
            return {
                ...state,
                loadingTopRubrics: true,
                loadingTopWords: true,
            }

        case RECEIVE_TOP_RUBRICS:
            return {
                ...state,
                loadingTopRubrics: false,
                topRubrics: [...action.rubrics],
            }

        case RECEIVE_TOP_WORDS:
            return {
                ...state,
                loadingTopWords: false,
                topWords: [...action.words],
            }

        default:
            return state
    }
}

export default app