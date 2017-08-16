import React, {PropTypes} from 'react'

const TableWords = ({words = []}) => {

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover" title='Слово'>
                <thead className="thead-inverse">
                <tr>
                    <td>Слово</td>
                    <td>Количество</td>
                </tr>
                </thead>
                <tbody>
                { words.map((word, i) => (
                    (word.title && word.title.length > 2)
                    && <tr key={i} className="">
                        <td>{word.title}</td>
                        <td>{word.count}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}

TableWords.propTypes = {
    words: PropTypes.array.isRequired,
}

export default TableWords