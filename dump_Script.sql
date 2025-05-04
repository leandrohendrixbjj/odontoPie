use saudesys;

CREATE TABLE T01_empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    public_id CHAR(36) UNIQUE NOT NULL,  
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  
    tipo_pessoa VARCHAR(10) NOT NULL CHECK (tipo_pessoa IN ('PF', 'PJ')),  
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL
);

CREATE TABLE T02_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,
    perfil VARCHAR(100),
    empresa_id INT NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES T01_empresas(id) 
);

CREATE TABLE T03_pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(14) UNIQUE,
    razao_social VARCHAR(100) NOT NULL,
    email VARCHAR(100) NULL,
	telefone VARCHAR(20) NULL, 
    celular VARCHAR(20) NULL, 
	tipo VARCHAR(100) NOT NULL, -- Cliente,Dentista,Fornecedor,Outros
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,
    empresa_id INT NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES T01_empresas(id)
);


CREATE TABLE T04_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL, 
    preco DECIMAL(10, 2) NOT NULL, 
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,
    empresa_id INT NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES T01_empresas(id) 
);

CREATE TABLE T05_agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    observacao TEXT, 
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,
	pessoa_id INT NOT NULL,	
	empresa_id INT NOT NULL,
	FOREIGN KEY (pessoa_id) REFERENCES T03_pessoas(id), 
	FOREIGN KEY (empresa_id) REFERENCES T01_empresas(id) 
);
 
CREATE TABLE T06_agenda_produtos (
	agenda_id INT NOT NULL,
    produto_id INT NOT NULL,
    PRIMARY KEY (agenda_id, produto_id),
    FOREIGN KEY (agenda_id) REFERENCES T05_agenda(id),
    FOREIGN KEY (produto_id) REFERENCES T04_produtos(id)
);