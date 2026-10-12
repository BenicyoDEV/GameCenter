const mysql = require('mysql2/promise');

const banco = {
    host: 'localhost',
    user: 'root',
    password: 'etecPoa#2026',
    database: 'pixelhub'
};


// ================================
// USUÁRIOS
// ================================

async function listarUsuarios() {

    const conexao = await mysql.createConnection(banco);

    const [usuarios] = await conexao.execute(
        'SELECT idUsuario, nome, email FROM usuarios'
    );

    await conexao.end();

    return usuarios;
}

async function buscarUsuarioPorEmail(email) {

    const conexao = await mysql.createConnection(banco);

    const [usuarios] = await conexao.execute(
        'SELECT idUsuario, nome, email FROM usuarios WHERE email = ?',
        [email]
    );

    await conexao.end();

    return usuarios[0] || null;
}

async function cadastrarUsuario(nome, email, senha) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await conexao.execute(sql, [
        nome,
        email,
        senha
    ]);

    await conexao.end();

    // devolve o usuário recém-criado, igual ao "usuarios.at(-1)" que o front usava
    return {
        idUsuario: resultado.insertId,
        nome: nome,
        email: email
    };
}

async function login(usuario, senha) {

    const conexao = await mysql.createConnection(banco);

    const [usuarios] = await conexao.execute(
        'SELECT idUsuario, nome, email FROM usuarios WHERE nome = ? AND senha = ?',
        [usuario, senha]
    );

    await conexao.end();

    return usuarios[0] || null;
}


// ================================
// JOGADORES
// ================================

async function listarJogadores(idUsuario) {

    const conexao = await mysql.createConnection(banco);

    // "AS nome"/"AS vitorias" pra o front não precisar trocar nomes[i].nome, nomes[i].vitorias
    const [jogadores] = await conexao.execute(
        `SELECT idJogador, nomeJogador AS nome, vitoriasJogador AS vitorias
         FROM jogadores WHERE idUsuario_fk = ?`,
        [idUsuario]
    );

    await conexao.end();

    return jogadores;
}

async function cadastrarJogador(nome, idUsuario) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        INSERT INTO jogadores (nomeJogador, vitoriasJogador, idUsuario_fk)
        VALUES (?, 0, ?)
    `;

    await conexao.execute(sql, [
        nome,
        idUsuario
    ]);

    await conexao.end();
}

async function alterarJogador(idJogador, novoNome) {

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

async function somarVitoria(idJogador) {

    const conexao = await mysql.createConnection(banco);

    const sql = `
        UPDATE jogadores
        SET vitoriasJogador = vitoriasJogador + 1
        WHERE idJogador = ?
    `;

    await conexao.execute(sql, [idJogador]);

    await conexao.end();
}

async function excluirJogador(idJogador) {

    const conexao = await mysql.createConnection(banco);

    // precisa sair primeiro de classificacoes, senão a FK barra o DELETE de jogadores
    // (isso significa que excluir um jogador apaga a posição dele em torneios antigos;
    //  se quiser manter o histórico intacto, a alternativa é bloquear a exclusão nesse caso)
    await conexao.execute(
        'DELETE FROM classificacoes WHERE idJogador_fk = ?',
        [idJogador]
    );

    await conexao.execute(
        'DELETE FROM jogadores WHERE idJogador = ?',
        [idJogador]
    );

    await conexao.end();
}


// ================================
// TORNEIOS
// ================================

async function buscarClassificacao(idTorneio) {

    const conexao = await mysql.createConnection(banco);

    const [linhas] = await conexao.execute(
        `SELECT j.nomeJogador AS nome
         FROM classificacoes c
         JOIN jogadores j ON j.idJogador = c.idJogador_fk
         WHERE c.idTorneio_fk = ?
         ORDER BY c.classificacaoNumero ASC`,
        [idTorneio]
    );

    await conexao.end();

    return linhas.map(function(linha) { return linha.nome; });
}

async function listarTorneios(idUsuario) {

    const conexao = await mysql.createConnection(banco);

    const [torneios] = await conexao.execute(
        `SELECT idTorneio, nomeTorneio AS nome, quantRodadas AS numRodadas
         FROM torneios WHERE idUsuario_fk = ?`,
        [idUsuario]
    );

    await conexao.end();

    // para cada torneio, busca a lista de nomes na ordem de classificação
    for (let i = 0; i < torneios.length; i++) {
        torneios[i].classificacao = await buscarClassificacao(torneios[i].idTorneio);
    }

    return torneios;
}

async function cadastrarTorneio(nomeTorneio, quantRodadas, classificacaoIds, idUsuario) {

    const conexao = await mysql.createConnection(banco);

    const sqlTorneio = `
        INSERT INTO torneios (nomeTorneio, quantRodadas, idUsuario_fk)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await conexao.execute(sqlTorneio, [
        nomeTorneio,
        quantRodadas,
        idUsuario
    ]);

    const idTorneio = resultado.insertId;

    const sqlClassificacao = `
        INSERT INTO classificacoes (idJogador_fk, idTorneio_fk, classificacaoNumero)
        VALUES (?, ?, ?)
    `;

    // classificacaoIds já vem na ordem: 1º colocado primeiro, 2º depois, etc.
    for (let i = 0; i < classificacaoIds.length; i++) {
        await conexao.execute(sqlClassificacao, [
            classificacaoIds[i],
            idTorneio,
            i + 1
        ]);
    }

    await conexao.end();
}


module.exports = {
    listarUsuarios,
    buscarUsuarioPorEmail,
    cadastrarUsuario,
    login,
    listarJogadores,
    cadastrarJogador,
    alterarJogador,
    somarVitoria,
    excluirJogador,
    listarTorneios,
    cadastrarTorneio
};
