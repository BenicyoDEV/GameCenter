const express = require('express');
const cors = require('cors');

const DAO = require('./dao');

const app = express();

app.use(cors());
app.use(express.json());


// ================================
// USUÁRIOS
// ================================

// cadastro
app.post('/usuarios', async function(req, res) {

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    try {

        const existente = await DAO.buscarUsuarioPorEmail(email);

        if (existente) {
            res.status(409).json({ erro: 'Este e-mail já está cadastrado' });
            return;
        }

        const usuario = await DAO.cadastrarUsuario(nome, email, senha);

        res.json(usuario);

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao cadastrar usuário' });

    }

});

// login
app.post('/login', async function(req, res) {

    const usuario = req.body.usuario;
    const senha = req.body.senha;

    try {

        const encontrado = await DAO.login(usuario, senha);

        if (!encontrado) {
            res.status(401).json({ erro: 'Usuário ou senha incorretos' });
            return;
        }

        res.json(encontrado);

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao fazer login' });

    }

});


// ================================
// JOGADORES
// ================================

// lista só os jogadores do usuário logado: GET /jogadores?usuario=3
app.get('/jogadores', async function(req, res) {

    const idUsuario = req.query.usuario;

    try {

        const jogadores = await DAO.listarJogadores(idUsuario);

        res.json(jogadores);

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao buscar jogadores' });

    }

});

app.post('/jogadores', async function(req, res) {

    const nome = req.body.nome;
    const idUsuario = req.body.usuario;

    try {

        await DAO.cadastrarJogador(nome, idUsuario);

        res.json({ mensagem: 'Jogador cadastrado!' });

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao cadastrar jogador' });

    }

});

app.put('/jogadores/:id', async function(req, res) {

    const idJogador = req.params.id;
    const nome = req.body.nome;

    try {

        await DAO.alterarJogador(idJogador, nome);

        res.json({ mensagem: 'Jogador alterado!' });

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao alterar jogador' });

    }

});

// soma 1 vitória (chamado quando o jogador vence uma rodada final de um torneio)
app.put('/jogadores/:id/vencer', async function(req, res) {

    const idJogador = req.params.id;

    try {

        await DAO.somarVitoria(idJogador);

        res.json({ mensagem: 'Vitória registrada!' });

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao registrar vitória' });

    }

});

app.delete('/jogadores/:id', async function(req, res) {

    const idJogador = req.params.id;

    try {

        await DAO.excluirJogador(idJogador);

        res.json({ mensagem: 'Jogador excluído!' });

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao excluir jogador' });

    }

});


// ================================
// TORNEIOS
// ================================

// lista só os torneios do usuário logado: GET /torneios?usuario=3
app.get('/torneios', async function(req, res) {

    const idUsuario = req.query.usuario;

    try {

        const torneios = await DAO.listarTorneios(idUsuario);

        res.json(torneios);

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao buscar torneios' });

    }

});

app.post('/torneios', async function(req, res) {

    const nome = req.body.nome;
    const numRodadas = req.body.numRodadas;
    const classificacao = req.body.classificacao;
    const idUsuario = req.body.usuario;

    try {

        await DAO.cadastrarTorneio(nome, numRodadas, classificacao, idUsuario);

        res.json({ mensagem: 'Torneio criado!' });

    } catch (erro) {

        res.status(500).json({ erro: 'Erro ao criar torneio' });

    }

});


// ================================
// INICIAR SERVIDOR
// ================================

app.listen(3000, function() {

    console.log('Servidor funcionando na porta 3000');

});
