/* 
   Configuração do cliente Axios para comunicação com o servidor local da aplicação.
   - Define o cabeçalho Content-Type como application/json para todas as requisições.
*/

import axios from 'axios';
import { baseURL } from './baseurl';

// Criação da instância do Axios com configurações específicas para o servidor local

const server = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default server