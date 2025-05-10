use saudesys;

INSERT INTO x12_empresas (
    public_id, razao_social, cnpj, email, tipo_pessoa
) VALUES (
    '123e4567-e89b-12d3-a456-426614174000',
    'Empresa Exemplo Ltda',
    '12345678000195',
    'contato@empresaexemplo.com',
    'PJ'
);

INSERT INTO x12_usuarios (
    public_id, nome, email, senha, status, perfil, empresa_id
) VALUES
(
    '111e4567-e89b-12d3-a456-426614174001',
    'João Silva',
    'joao.silva@empresaexemplo.com',
    'senha123',
    1,
    'admin',
    '123e4567-e89b-12d3-a456-426614174000'
),
(
    '222e4567-e89b-12d3-a456-426614174002',
    'Maria Oliveira',
    'maria.oliveira@empresaexemplo.com',
    'senha456',
    1,
    'usuario',
    '123e4567-e89b-12d3-a456-426614174000'
);

