import './TablePS.css';
import React from 'react';

function TablePS() {
    return (
        <table className="tabelaPS">
            <tbody>
                <tr>
                    <td>Inicio das Inscrições</td>
                    <td>11/03/2024</td>
                </tr>
                <tr>
                    <td>Término das Inscrições</td>
                    <td>12/04/2024</td>
                </tr>
                <tr>
                    <td>Inicio do processo seletivo</td>
                    <td>13/04/2024</td>
                </tr>
                <tr>
                    <td>Término do processo seletivo</td>
                    <td>01/07/2024</td>
                </tr>
                <tr>
                    <td>Resultados</td>
                    <td>02/07/2024</td>
                </tr>
            </tbody>
        </table>
    );
}

export default TablePS;
