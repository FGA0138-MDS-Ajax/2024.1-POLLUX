import './TableProx.css';
import React from 'react';

function TableProx() {
    return (
        <table className="tabelaProx">
            <thead>
                <tr>
                    <th className='tamanhoEvento'>Evento</th>
                    <th className='tamanhoLocal'>Local</th>
                    <th className='tamanhoData'>Data</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Competição Brasileira de Robótica (CBR)</td>
                    <td>Goiânia - GO</td>
                    <td>11 a 17 de Novembro</td>
                </tr>
                <tr>
                    <td>SAE Eletroquad 2025</td>
                    <td>São José dos Campos – SP</td>
                    <td>Maio de 2025</td>
                </tr>
                <tr>
                    <td>ICUAS 2025</td>
                    <td>A definir</td>
                    <td>Junho de 2025</td>
                </tr>
            </tbody>
        </table>
    );
}

export default TableProx;
