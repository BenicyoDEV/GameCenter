const mysql = require('mysql2/promise');

const banco = {
    host: 'localhost',
    user: 'root',          
    password: 'etecPoa#2026',
    database: 'pixelhub'
};


// LISTAR PRODUTOS

async function listarJogadores() {

    const conexao = await mysql.createConnection(banco);

    const [jogadores] = await conexao.execute(
        'SELECT * FROM jogadores'
    );

    await conexao.end();

    return jogadores;
}

async function listarUsuarios() {

    const conexao = await mysql.createConnection(banco);

    const [usuarios] = await conexao.execute(
        'SELECT * FROM usuario'
    );

    await conexao.end();

    return usuarios;
}

async function listarTorneios() {

    const conexao = await mysql.createConnection(banco);

    const [torneios] = await conexao.execute(
        'SELECT * FROM torneio'
    );

    await conexao.end();

    return torneios;
}


// CADASTRAR PRODUTO

async function cadastrarJogador(nome, fkUsuario) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO jogadores
        (nome, usuario_fk)
        VALUES (?, ?)
    `;

    await conexao.execute(sql, [
        nome,
        usuario_fk
    ]);

    await conexao.end();
}

async function cadastrarUsuario(nome, email, senha) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO usuario
        (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    await conexao.execute(sql, [
        nome,
        email,
        senha
    ]);

    await conexao.end();
}

async function cadastrarTorneio(nomeTorneio, quantRodadas, classificacao, idUsuario_fk, idJogador_fk) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO torneio
        (nomeTorneio, quantRodadas, idUsuario_fk, nomeJogador_fk)
        VALUES (?, ?, ?, ?)
        
    `;

    await conexao.execute(sql, [
        nomeTorneio,
        quantRodadas,
        idUsuario_fk,
        idJogador_fk
    ]);

    await conexao.end();
}

async function atualizarHistorico(classificacao, idJogador_fk) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO torneio
        (classificacao)
        VALUES (?)
    `;

    await conexao.execute(sql, [
        torneio
    ]);

    await conexao.end();
}



// ALTERAR PRODUTO

async function alterarJogador(novoNome, idJogador) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        UPDATE jogadores
        SET nomeJogador = ?
        WHERE idJogador = ?
    `;

    await conexao.execute(sql, [
        novoNome,
        idJogador
    ]);

    await conexao.end();
}


// EXCLUIR PRODUTO

async function excluirProduto(id) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        DELETE FROM item_pedido_compra 
        where cod_produto_fk = ?
    `;

        const sql2 = `
        DELETE FROM item_nota_fiscal 
        WHERE cod_produto_fk = ?
    `;

        const sql3 = `
        DELETE FROM produto
        WHERE cod_produto = ?
    `;

    await conexao.execute(sql, [id]);
    await conexao.execute(sql2, [id]);
    await conexao.execute(sql3, [id]);

    await conexao.end();
}



module.exports = {
    listarProdutos,
    cadastrarProduto,
    alterarProduto,
    excluirProduto
};