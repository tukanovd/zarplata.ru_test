import React, {PropTypes} from 'react'

const TableRubrics = ({rubrics}) => (
    <div className="table-responsive">
        <table className="table table-bordered table-hover" title='Слово'>
            <thead className="thead-inverse">
            <tr>
                <td>Название рубрики</td>
                <td>Количество</td>
            </tr>
            </thead>
            <tbody>
            { rubrics.map(rubica => (
                <tr key={rubica.id} className="">
                    <td>{rubica.title}</td>
                    <td>{rubica.vacancies.length}</td>
                </tr>
            ))
            }
            </tbody>
        </table>
    </div>
)

TableRubrics.propTypes = {
    rubrics: PropTypes.array.isRequired,
}

export default TableRubrics