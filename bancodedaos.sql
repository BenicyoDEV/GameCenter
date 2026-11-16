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

create or replace view v_Classificacao as
select
j.nomeJogador as "Nome do Jogador",
t.nomeTorneio as "Nome do Torneio",
c.classificacaoNumero as "Posição"

from jogadores j, classificacoes c, torneios t
where j.idJogador = c.idJogador_fk
  and t.idTorneio = c.idTorneio_fk;


delimiter $$
create function fn_MediaVitoriaPJogador()
returns decimal(10,4)
reads sql data
begin

DECLARE media DECIMAL(10,4) DEFAULT 0;
declare vitorias int default 0;
declare totalJogadores int default 0;

select count(*) into totalJogadores from jogadores; 
select sum(vitoriasJogador) into vitorias from jogadores;

set media = vitorias/totalJogadores;

return media;

end $$
delimiter ;
