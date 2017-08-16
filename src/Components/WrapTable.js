import React, { PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'

const TableWrap = ({ title, children }) => {
    return (
        <div>
            <header
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <div>
                    <p>{title}</p>
                    <p>Количество вакансий</p>
                </div>
            </header>
            <div displayRowCheckbox={false}>
                {children}
            </div>
        </div>
    )
}

TableWrap.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.array,
}

export default TableWrap