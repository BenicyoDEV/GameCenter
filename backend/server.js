const express = require('express');
const cors = require('cors');

const ProdutoDAO = require('./produtoDAO');

const app = express();

app.use(cors());
app.use(express.json());


// LISTAR PRODUTOS

app.get('/produtos', async function(req, res) {

    try {

        const produtos =
            await ProdutoDAO.listarProdutos();

        res.json(produtos);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao buscar produtos'
        });

    }

});


// CADASTRAR PRODUTO

app.post('/produtos', async function(req, res) {

    const nome = req.body.nome;
    const preco = req.body.preco;
    const estoque = req.body.estoque;

    try {

        await ProdutoDAO.cadastrarProduto(
            nome,
            preco,
            estoque
        );

        res.json({
            mensagem: 'Produto cadastrado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao cadastrar produto'
        });

    }

});


// ALTERAR PRODUTO

app.put('/produtos/:id', async function(req, res) {

    const id = req.params.id;

    const nome = req.body.nome;
    const preco = req.body.preco;
    const estoque = req.body.estoque;

    try {

        await ProdutoDAO.alterarProduto(
            id,
            nome,
            preco,
            estoque
        );

        res.json({
            mensagem: 'Produto alterado!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao alterar produto'
        });

    }

});


// EXCLUIR PRODUTO

app.delete('/produtos/:id', async function(req, res) {

    const id = req.params.id;

    try {

        await ProdutoDAO.excluirProduto(id);

        res.json({
            mensagem: 'Produto excluído!'
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao excluir produto'
        });

    }

});


// INICIAR SERVIDOR

app.listen(3000, function() {

    console.log(
        'Servidor funcionando na porta 3000'
    );

});