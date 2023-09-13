
CREATE DATABASE IF NOT EXISTS openclass
    DEFAULT CHARACTER SET = 'utf8mb4';
USE openclass;

CREATE TABLE user_type(
    id_user_type INT PRIMARY KEY,
    user_type_description VARCHAR(30)
);


CREATE TABLE user_data(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    cpf_cnpj VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_name VARCHAR(100),
    phone VARCHAR(25),
    flag_active INT,
    fk_user_type INT,
    FOREIGN KEY (fk_user_type) REFERENCES user_type(id_user_type)
);

CREATE TABLE lab(
	id_lab INT PRIMARY KEY AUTO_INCREMENT,
    lab VARCHAR(100) NOT NULL,
    floor INT,
    lab_description VARCHAR(100),
    flag_active INT
);

CREATE TABLE booking(
	id_booking INT PRIMARY KEY AUTO_INCREMENT,
    booking_date DATETIME,
    fk_lab INT,
    fk_user INT,
    FOREIGN KEY (fk_lab) REFERENCES lab(id_lab),
    FOREIGN KEY (fk_user) REFERENCES user_data(id_user)
);

CREATE TABLE payment(
	id_payment INT PRIMARY KEY AUTO_INCREMENT,
    boleto CHAR(8) NOT NULL,
    status_pagamento VARCHAR(15),
    payment_date DATETIME,
    fk_user INT,
    FOREIGN KEY (fk_user) REFERENCES user_data(id_user)
);


-- INSERTS

-- Inserir dados na tabela user_type
INSERT INTO user_type (id_user_type, user_type_description) VALUES
(1, 'Administrador'),
(2, 'Professor'),
(3, 'Aluno');

-- Inserir dados na tabela user_data
INSERT INTO user_data (cpf_cnpj, email, user_password, user_name, phone, flag_active, fk_user_type) VALUES
('12345678901', 'admin@example.com', 'senha123', 'Impacta', '11 95197-6068', 1, 1),
('98765432101', 'professor@example.com', 'senha456', 'Carlos', '11 95197-6069', 1, 2),
('55555555501', 'aluno@example.com', 'senha789', 'Nathalia', '11 95197-6067', 1, 3);

-- Inserir dados na tabela lab
INSERT INTO lab (lab, floor, lab_description, flag_active) VALUES
('LAB001', 1, 'Laboratório de Informática', 1),
('LAB002', 2, 'Laboratório de Química', 1),
('LAB003', 1, 'Laboratório de Física', 1);

-- Inserir dados na tabela booking
INSERT INTO booking (booking_date, fk_lab, fk_user) VALUES
('2023-09-12 10:00:00', 1, 2),
('2023-09-13 14:30:00', 2, 3),
('2023-09-14 09:15:00', 3, 2);

-- Inserir dados na tabela payment
INSERT INTO payment (boleto, status_pagamento, payment_date, fk_user) VALUES
('12345678', 'Pago', '2023-09-12 12:00:00', 3),
('98765432', 'Pendente', '2023-09-13 15:00:00', 3),
('55555555', 'Pago', '2023-09-14 10:30:00', 3);


-- SELECTS TESTE
-- TODOS OS USER
SELECT * FROM user_data;

-- USUARIOS ATIVOS
SELECT * FROM user_data WHERE flag_active = 1;

-- LABS ATIVOS
SELECT * FROM lab WHERE flag_active = 1;

-- RESERVAS POR USUARIO
SELECT * FROM booking WHERE fk_user = 2;

-- RESERVAS POR LAB
SELECT * FROM booking WHERE fk_lab = 1;

-- PAGAMENTOS FEITOS
SELECT * FROM payment WHERE status_pagamento = 'Pago';

-- NUMERO DA RESERVA, USER E TIPO DE USUARIO
SELECT
    b.id_booking,
    u.user_name AS user_name,
    ut.user_type_description AS user_type
FROM
    booking AS b
INNER JOIN
    user_data AS u ON b.fk_user = u.id_user
INNER JOIN
    user_type AS ut ON u.fk_user_type = ut.id_user_type;

-- CONTAR LABS ATIVOS
SELECT COUNT(*) AS total_lab_ativos FROM lab WHERE flag_active = 1;
