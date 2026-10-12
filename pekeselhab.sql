-- =========================================
-- schema.sql — banco "pixelhub"
-- Rode isso uma vez no MySQL antes de ligar o server.js
-- =========================================

create database if not exists pixelhub;
use pixelhub;

create table usuarios(
    idUsuario int not null primary key auto_increment,
    nome varchar(50) not null,
    email varchar(50) not null unique,
    senha varchar(50) not null
) engine = InnoDB;

create table jogadores(
    idJogador int not null primary key auto_increment,
    idUsuario_fk int not null,
    nomeJogador varchar(50) not null,
    vitoriasJogador int not null,
    foreign key (idUsuario_fk) references usuarios(idUsuario)
) engine = InnoDB;

create table torneios(
    idTorneio int not null primary key auto_increment,
    idUsuario_fk int not null,
    nomeTorneio varchar(100) not null,
    quantRodadas int not null,
    foreign key (idUsuario_fk) references usuarios(idUsuario)
) engine = InnoDB;

create table classificacoes(
    idClassificacao int not null primary key auto_increment,
    idJogador_fk int not null,
    idTorneio_fk int not null,
    classificacaoNumero int not null,
    foreign key (idTorneio_fk) references torneios(idTorneio),
    foreign key (idJogador_fk) references jogadores(idJogador)
) engine = InnoDB;
