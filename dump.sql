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


CREATE TABLE Usuarios (
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
    FOREIGN KEY (empresa_id) REFERENCES Empresas(id) -- Definição da chave estrangeira
);

CREATE TABLE Fornecedores (
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
    empresa_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES Empresas(id) -- Definição da chave estrangeira
);

CREATE TABLE Produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL, -- Alteração para NOT NULL
    preco DECIMAL(10, 2) NOT NULL, -- Alteração para NOT NULL
    status TINYINT DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL
);

CREATE TABLE Agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    observacao TEXT, -- Alteração do nome do campo
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME NULL,
	cliente_id INT,
	fornecedor_id INT,
	FOREIGN KEY (cliente_id) REFERENCES Clientes(id) -- Definição da chave estrangeira	
	FOREIGN KEY (fornecedor_id) REFERENCES Fornecedores(id) -- Definição da chave estrangeira
);

CREATE TABLE AgendaProdutos (
    agenda_id INT NOT NULL,
    produto_id INT NOT NULL,
    PRIMARY KEY (agenda_id, produto_id),
    FOREIGN KEY (agenda_id) REFERENCES Agenda(id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);