use saudesys;

INSERT INTO x12_empresas (public_id, razao_social, cnpj, email, tipo_pessoa)
VALUES 
  ('b4f5c990-1a2b-4f6e-b718-a5a9e0000001', 'Clínica Odonto Vida', '12345678000190', 'contato@odontovida.com', 'PJ'),
  ('b4f5c990-1a2b-4f6e-b718-a5a9e0000002', 'Odonto Sorriso Ltda', '98765432000155', 'sorriso@odonto.com', 'PJ');

INSERT INTO x12_perfis (public_id, nome)
VALUES 
  ('P001', 'Administrador'),
  ('P002', 'Recepcionista'),
  ('P003', 'Dentista');

INSERT INTO x12_usuarios (public_id, nome, email, senha, situacao, empresa_id, perfil_id)
VALUES 
  ('dfe28a1b-00ff-4cba-8ab2-01fa00000001', 'Ana Souza', 'ana@odontovida.com', 'senha123', 1, 'b4f5c990-1a2b-4f6e-b718-a5a9e0000001', 'P001'),
  ('dfe28a1b-00ff-4cba-8ab2-01fa00000002', 'Carlos Lima', 'carlos@sorriso.com', 'senha456', 1, 'b4f5c990-1a2b-4f6e-b718-a5a9e0000002', 'P003');


-- x12_status
INSERT INTO x12_status (public_id, nome)
VALUES
  ('S001', 'Agendado'),
  ('S002', 'Triagem'),
  ('S003', 'Cotação'),
  ('S004', 'Tratamento'),
  ('S005', 'Alta'),
  ('S006', 'Reaberto'),
  ('S007', 'Cancelado');

  

