# 2024.1 POLLUX - Projeto EDRA

<p align="center">
  <img src="./view/public/edraV.svg" height='300px' style={{ display: 'block', margin: 'auto', marginTop: '100px' }} />
</p>


# Sobre

O projeto EDRA têm como objetivo criar uma aplicação web que sirva para divulgação e também para o gerenciamento da equipe de competição EDRA da UnB - FGA, da qual, só os membros da equipe poderão ter acesso. Dessa forma, teremos dois grandes módulos de desenvolvimento.

# Principais Recursos 
- Divulgação: página com intuito de apresentar a equipe e seus integrantes, competições e informações essenciais para o processo seletivo.

- Gerência de calendário: página para gerenciar quadro Kanban de tarefas da equipe, e, também um calendário disponível para compromissos.

- Gerência de estoque: página para controlar as peças, com suas respectivas quantidades e status.

- Gerência de reuniões: página para adicionar atas e ter o controle de presença de reuniões.

- Gerência de documentos: página para administração de documentos linkados e acesso aos mesmos.

- Gerência de Financeiro: página para controle de entradas e saídas com suas respectivas descrições. Além do cálculo final com o saldo atualizado.
  
# Documentação
Link para a documentação do projeto: [MkDocs - Pollux 2024.1](https://fga0138-mds-ajax.github.io/2024.1-POLLUX/) <br><br>

# Instruções para iniciar o site localmente (em ambientes Unix)

### Dependências

- Node.js v20.13.1
- NPM (Node Package Manager)
- PostgreSQL
- Ruby
- Rails
- Docker

### Passo a passo para iniciar o projeto

1.  **Clone o repositório:**

    ```
    git clone https://github.com/FGA0138-MDS-Ajax/2024.1-POLLUX.git
    ``` 
    Caso seja necessário, entre na pasta do projeto
    ```
    cd 2024-1-POLLUX
    ```

2.  **Configuração do Banco de Dados:**
    ```
    touch .env
    ```
    Coloque o nome do banco de dados, seu usuário e sua senha no arquivo .env
    ```
    cp .env /backend/
    ```
    ```
    sudo docker compose up -d
    ```
    ```
    cd backend/
    ```
    ```
    rails db:create
    ```
    ```
    rails db:migrate
    ```
    
      
3.  **Executar  o projeto**

    Para rodar o front-end da aplicação faça os seguintes comandos:

    ```
    cd view
    ```
    ```
    npm install
    ```
    ```
    npm run dev
    ```

    Em um novo terminal, navegue até a pasta backend para configurar o rails
    ```
    rails db:seed
    ```
    ```
    rails s
    ```
4.  **Para entrar na plataforma de gerenciamento**
   
    Deve se acessar a logo da EDRA no canto superior esquerdo da tela e logar utilizando o seguinte login
    Matricula:
    ```
    000000000
    ```
    Senha:
    ```
    senha123
    ```

# Instruções para executar os testes
1. **Para fazer os testes unitarios**
    
    Primeiramente você deve rodar o banco localmente, sem a utilização do docker
    [crie seu usuário no postgres](https://rpg.consudata.com.br/posts/2021-03-30-papeis-e-usurios-no-postgresql/) com o mesmo usuário e senha da sua .env

    ```
    cd /backend
    ```
    ```
    rails test
    ```
2. **Para fazer os testes de integração com o Bruno**

   Instale o [Bruno](https://www.usebruno.com/downloads).

   Com isso, escolha o diretório do repositório, vá em backend, docs e por fim, PolluxEndpoints. Altere o ambiente para "Dev", e as requisições estão prontas para serem testadas
# Autores

 <table>
    <tr>
      <td valign="top">
        <a href="https://github.com/julia-fortunato">
          <img align="center" src="https://github.com/julia-fortunato.png" height="100" />
          <p align="center"> Júlia Fortunato </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/mauricio-araujoo">
          <img align="center" src="https://github.com/Mauriciofearauj.png" height="100" />
          <p align="center"> Maurício Ferreira </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/femathrl">
          <img align="center" src="https://github.com/femathrl.png" height="100" />
          <p align="center"> Felipe Matheus </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/Oleari19">
          <img align="center" src="https://github.com/Oleari19.png" height="100" />
          <p align="center"> Maria Clara </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/jazzer0">
          <img align="center" src="https://github.com/jazzer0.png" height="100" />
          <p align="center"> João Ricardo </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/Caio-Antonio">
          <img align="center" src="https://github.com/Caio-Antonio.png" height="100" />
          <p align="center"> Caio Antônio </p>
        </a>
      </td>
      <td valign="top">
        <a href="https://github.com/Felipe-Brandim">
          <img align="center" src="https://github.com/Felipe-Brandim.png" height="100" />
          <p align="center"> Felipe Brandim </p>
        </a>
      </td>
        <td valign="top">
        <a href="https://github.com/rich4rd1">
          <img align="center" src="https://github.com/rich4rd1.png" height="100" />
          <p align="center"> Kauã Richard </p>
        </a>
      </td>  
    </tr>
  </table>
</section>
