import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import TopRubricsTable from '../Components/TopRubricsTable'
import TopWordsTable from '../Components/TopWordsTable'
import {fetchVacancies} from '../Actions/index'

class MainPage extends Component {

    componentDidMount() {
        this.props.fetchVacancies()
    }

    render() {
        return (

                <div className="row">
                    <div className="col-md-6 col-md-offset-3 vert-offset-top-2 head-container header">
                        <div className="orange-head header">
                            <div className="col-md-offset-1 vert-offset-top-0 title-container">Топ вакансий в Новосибирске за сегодня</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-3 head-container footer">
                        <div className="col-md-6 footer">
                            <TopRubricsTable rubrics={this.props.topRubrics}/>
                        </div>
                        <div className="col-md-6 footer">
                            <TopWordsTable words={this.props.topWords}/>
                        </div>
                    </div>
                </div>

        )
    }
}

MainPage.propTypes = {
    fetchVacancies: PropTypes.func,
    loadingTopRubrics: PropTypes.bool,
    loadingTopWords: PropTypes.bool,
    topRubrics: PropTypes.array,
    topWords: PropTypes.array,
}

function mapStateToProps(state) {
    return {
        topRubrics: state.topRubrics,
        topWords: state.topWords,
        loadingTopRubrics: state.loadingTopRubrics,
        loadingTopWords: state.loadingTopWords,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVacancies() {
            dispatch(fetchVacancies())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)