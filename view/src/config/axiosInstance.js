/* 
   Configuração do cliente Axios para comunicação com o servidor local da aplicação.
   - Define o cabeçalho Content-Type como application/json para todas as requisições.
*/

import axios from 'axios'

// Criação da instância do Axios com configurações específicas para o servidor local

const server = axios.create({
    baseURL: 'http://18.209.49.236:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default server