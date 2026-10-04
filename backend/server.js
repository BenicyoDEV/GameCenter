const express = require('express');
const cors = require('cors');

const DAO = require('./dao');

const app = express();

app.use(cors());
app.use(express.json());


// LISTAR JOGADORES E USUÁRIOS

app.get('/jogadores', async function(req, res) {

    try {

        const jogadores =
            await DAO.listarJogadores();

        res.json(jogadores);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao buscar Jogador'
        });

    }

});

app.get('/usuarios', async function(req, res) {

    try {

        const usuarios =
            await DAO.listarUsuarios();

        res.json(usuarios);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao buscar Usuario'
        });

    }

});

app.get('/torneios', async function(req, res) {

    try {

        const torneios =
            await DAO.listarTorneios();

        res.json(torneios);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao buscar Torneios'
        });

    }

});


// CADASTRAR JOGADOR

app.post('/jogadores', async function(req, res) {

    const nome = req.body.nome;
    const usuariofk = req.body.usuario;

    try {

        await DAO.cadastrarJogador(
            nome,
            usuariofk
        );

        res.json({
            mensagem: 'Jogador cadastrado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao cadastrar Jogador'
        });

    }

});

app.post('/usuario', async function(req, res) {

    const nome = req.body.nome;
    const usuarioid = req.body.usuarioId
    const senha = req.body.senha
    const email = req.body.email

    try {

        await DAO.cadastrarUsuario(
            nome,
            usuarioid,
            email,
            senha
        );

        res.json({
            mensagem: 'Usuario cadastrado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao cadastrar Usuario'
        });

    }

});

app.post('/torneios', async function(req, res) {

    const nome = req.body.nome;
    const usuariofk = req.body.usuario;
    const idTorneio = req.body.torneio;
    const numRodadas = req.body.numRodadas;
    const classificacao = req.body.classificacao;


   try {

        await DAO.cadastrarTorneio(
            nome,
            usuariofk,
            idTorneio,
            numRodadas,
            classificacao
        );

        res.json({
            mensagem: 'Torneio criado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao criar torneio'
        });

    }

});


// ALTERAR JOGADORES

app.put('/jogadores/:id', async function(req, res) {

    const usuariofk = req.params.id;
    const nome = req.body.nome;
    const idJogador = req.body.idJogador;

    try {

        await DAO.alterarJogador(
            usuariofk,
            nome,
            idJogador
        );

        res.json({
            mensagem: 'Jogador alterado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao alterar jogador'
        });

    }

});


// EXCLUIR JOGADOR

app.delete('/jogadores/:id', async function(req, res) {

    const id = req.params.id;

    try { 

        await DAO.excluirJogador(id);

        res.json({
            mensagem: 'Jogador excluído!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao excluir jogador'
        });

    }

});


// INICIAR SERVIDOR

app.listen(3000, function() {

    console.log(
        'Servidor funcionando na porta 3000'
    );

});