import './TablePS.css';
import React from 'react';

function TablePS() {
    return (
        <table className="tabelaPS">
            <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Row 1, Column 1</td>
                    <td>Row 1, Column 2</td>
                </tr>
                <tr>
                    <td>Row 2, Column 1</td>
                    <td>Row 2, Column 2</td>
                </tr>
                <tr>
                    <td>Row 3, Column 1</td>
                    <td>Row 3, Column 2</td>
                </tr>
                <tr>
                    <td>Row 4, Column 1</td>
                    <td>Row 4, Column 2</td>
                </tr>
            </tbody>
        </table>
    );
}

export default TablePS;
