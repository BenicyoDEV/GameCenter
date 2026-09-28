create table usuario(
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
    foreign key (idUsuario_fk) references usuario(idUsuario)
) engine = InnoDB;

    create table torneio(
        idTorneio int not null primary key auto_increment,
        idJogador_fk int not null,
        idUsuario_fk int not null,
        nomeTorneio varchar(100) not null,
        quantRodadas int not null,
        classificacao varchar(1000) not null,
        foreign key (idJogador_fk) references jogadores(idJogador_fk),
        foreign key (idUsuario_fk) references usuario(idUsuario)
    )   engine = InnoDB;