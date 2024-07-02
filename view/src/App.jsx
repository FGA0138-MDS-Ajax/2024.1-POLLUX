/*
   Arquivo principal ue renderiza a estrutura principal da aplicação.
   Importa e utiliza o componente `AppRoutes` para gerenciar as rotas.
*/

import './App.css'
import AppRoutes from './routes'

function App() {

  return (
    <>
      <div>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
