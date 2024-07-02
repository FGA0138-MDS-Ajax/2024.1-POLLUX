/*
   Configuração inicial para renderização da aplicação React.
   - Utiliza ReactDOM para renderizar o componente principal `App` na página.
   - Configura o uso de React.StrictMode para destacar potenciais problemas na 
   aplicação durante o desenvolvimento.
   - Define o ponto de entrada da aplicação, associando o componente `App` ao 
   elemento DOM com id 'root'.
   - Importa estilos globais definidos em `index.css` para aplicação na página.
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// `ReactDOM.createRoot` é usado para renderização de aplicativos baseados em React Suspense, 
// otimizando a renderização assíncrona.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
