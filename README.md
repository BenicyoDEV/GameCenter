# 🎮 Pixel Hub — Sistema de Gerenciamento de Jogadores e Torneios

**📅 Data de produção:** Setembro de 2026

Projeto acadêmico que apresenta um sistema web para **cadastro de jogadores e organização de torneios**, com login de usuário, gerenciamento completo de participantes e histórico de competições. O sistema conta com armazenamento em banco de dados e uma API hospedada em servidor online, permitindo o acesso e a persistência dos dados.

---

## 💻 Sobre o Projeto

O **Pixel Hub** foi criado com foco em **organização de dados e experiência de uso simples**, permitindo que o usuário cadastre jogadores, monte torneios e acompanhe o desempenho de cada um ao longo do tempo.

O site inclui:
- Sistema de login e cadastro de usuário
- Cadastro, pesquisa e edição de jogadores
- Criação de torneios com seleção de participantes e acompanhamento de rodadas
- Histórico com os torneios já finalizados
- Painel com estatísticas gerais (quantidade de jogadores, vitórias, médias, etc.)
- **Armazenamento online** dos dados dos usuários, jogadores e torneios
- **Responsividade completa** com uso de *media queries* para celulares

---

## 🧭 Funcionalidades

- **Login e Cadastro:** criação de conta com validação de nome, e-mail e senha, e login com verificação de usuário e senha.
- **Gerenciar Jogadores:** cadastro de novos jogadores, pesquisa por nome e por número de vitórias, edição e remoção, além de um painel com estatísticas (quantidade de jogadores, jogador com mais/menos vitórias, média de vitórias, vencedores e não vencedores).
- **Criar Torneio:** seleção dos jogadores participantes, montagem das rodadas e definição automática do vencedor a cada rodada, até chegar ao campeão do torneio.
- **Histórico de Torneios:** lista todos os torneios já concluídos, com nome, número de rodadas e classificação final dos jogadores.
- **Menu Principal:** ponto de entrada do sistema, com destaque para os últimos torneios realizados.

---

## 🗄️ Armazenamento de Dados

Diferentemente da versão inicial, que utilizava exclusivamente o **localStorage do navegador**, o sistema atualmente conta com um **banco de dados TiDB** e um servidor online hospedado na plataforma **Render**.

O backend foi desenvolvido com **Node.js e Express**, disponibilizando uma API responsável pela comunicação entre o site e o banco de dados. As operações de cadastro, consulta, edição e exclusão são realizadas por meio de requisições HTTP.

Os dados são organizados em tabelas relacionais:
- **Usuários:** armazenamento das informações das contas cadastradas.
- **Jogadores:** armazenamento dos jogadores e suas respectivas quantidades de vitórias, associados aos usuários.
- **Torneios:** armazenamento dos torneios criados e suas informações.
- **Classificações:** registro da posição de cada jogador nos torneios finalizados.

O **localStorage** continua sendo utilizado apenas para armazenar as informações básicas do usuário logado no navegador. Os dados principais do sistema são persistidos no TiDB, permitindo que permaneçam disponíveis mesmo após fechar ou acessar o site em outro momento.

A conexão com o banco de dados é realizada pelo pacote **mysql2**, utilizando variáveis de ambiente para as credenciais e conexão segura por SSL/TLS.

---

## 🧑‍💻 Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| **HTML5** | Estruturação das páginas |
| **CSS3** | Estilizações, responsividade e efeitos visuais |
| **JavaScript** | Lógica do sistema, validações e manipulação da interface |
| **Node.js** | Execução do backend e gerenciamento do servidor |
| **Express** | Criação da API e gerenciamento das rotas e requisições HTTP |
| **MySQL2** | Comunicação entre o servidor e o banco de dados |
| **TiDB** | Banco de dados relacional para armazenamento dos usuários, jogadores e torneios |
| **Render** | Hospedagem do servidor e disponibilização da API online |
| **localStorage** | Armazenamento local das informações básicas do usuário logado |
| **dotenv** | Gerenciamento das variáveis de ambiente utilizadas na conexão com o banco |

---

## 👥 Integrantes do Projeto

Todos os integrantes participaram do desenvolvimento inicial do projeto, implementando sua primeira versão com armazenamento em localStorage.

**Desenvolvimento da versão inicial:**
- **[@BenicyoDEV](https://github.com/BenicyoDEV)**
- **[@arthurleon44](https://github.com/arthurleon44)**
- **[@alicercedev](https://github.com/alicercedev)**
- **[@gabrielmaximianomax-svg](https://github.com/gabrielmaximianomax-svg)**

**Implementação da versão online (TiDB e Render):**
- **[@BenicyoDEV](https://github.com/BenicyoDEV)**
- **[@alicercedev](https://github.com/alicercedev)**

---

**🏫 Instituição:** ETEC de Poá — Curso de Desenvolvimento de Sistemas, 2º ano
