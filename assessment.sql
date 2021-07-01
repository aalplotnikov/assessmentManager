-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- TOC entry 3024 (class 1262 OID 1200202)
-- Name: library; Type: DATABASE; Schema: -; Owner: -
--



CREATE DATABASE assessmentdb;
\connect assessmentdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


create table ref_positions (
    pk_id           serial primary key,
    c_name          varchar(80)
);

create table ref_status_assessment (
    pk_id           serial primary key,
    c_name          varchar(80)
);

create table ref_status_candidate (
    pk_id           serial primary key,
    c_name          varchar(80)
);

create table ref_role (
    pk_id           serial primary key,
    c_name          varchar(80)
);

create table t_assessment (
    pk_id           serial primary key,
    fk_status       int not null  references ref_status_assessment (pk_id),
    c_name          varchar(80) not null,
    c_date          timestamp not null
);

create table t_employees(
    pk_id           serial primary key,
    fk_position     int not null references ref_positions (pk_id),
    c_name          varchar(80) not null,
    c_lastname      varchar(80) not null,
    c_middlename    varchar(80),
    c_phone_number  varchar(11) not null,
    c_email         varchar(80) not null,
    c_birthday      date
);

create table t_candidates(
    pk_id           serial primary key,
    c_name          varchar(80) not null,
    c_lastname      varchar(80) not null,
    c_middlename    varchar(80),
    c_phone_number  varchar(11) not null,
    c_email         varchar(80) not null,
    c_note          text,
    c_birthday      date
);

create table toc_assessment_employees (
    pk_id           serial primary key,
    fk_assessment   int not null references t_assessment (pk_id) ON DELETE CASCADE,
    fk_employee     int not null references t_employees (pk_id) ON DELETE CASCADE,
    fk_role         int not null references ref_role (pk_id) ON DELETE CASCADE
);

create table toc_assessment_candidates (
    pk_id           serial primary key,
    fk_assessment   int not null references t_assessment (pk_id) ON DELETE CASCADE,
    fk_candidate    int not null references t_candidates (pk_id) ON DELETE CASCADE,
    fk_status       int not null references ref_status_candidate (pk_id) ON DELETE CASCADE
);

ALTER TABLE t_assessment ALTER COLUMN c_date TYPE timestamp;


INSERT INTO ref_status_assessment (c_name) VALUES ('Заполнен');
INSERT INTO ref_status_assessment (c_name) VALUES ('Не заполнен');
INSERT INTO ref_status_assessment (c_name) VALUES ('В ожидании статуса');
INSERT INTO ref_status_assessment (c_name) VALUES ('В ожидании оценки');
INSERT INTO ref_status_assessment (c_name) VALUES ('Завершен');


insert into ref_role (c_name) values ('Интервьюер');
insert into ref_role (c_name) values ('Член комиссии');

insert into ref_status_candidate (c_name) VALUES ('Приглашен');
insert into ref_status_candidate (c_name) VALUES ('Не приглашен');
insert into ref_status_candidate (c_name) VALUES ('Явился');
insert into ref_status_candidate (c_name) VALUES ('Не явился');
insert into ref_status_candidate (c_name) VALUES ('Успешен');
insert into ref_status_candidate (c_name) VALUES ('Не успешен');

INSERT INTO ref_positions (c_name) VALUES ('Программист');


insert into toc_assessment_candidates (fk_assessment, fk_candidate, fk_status) VALUES (1, 4, 1);
insert into toc_assessment_candidates (fk_assessment, fk_candidate, fk_status) VALUES (1, 6, 1);

INSERT INTO t_assessment (fk_status, c_name, c_date) VALUES (1, 'Самый первый ассессмент', '2021-06-16');


INSERT INTO t_employees (fk_position, c_name, c_lastname, c_middlename, c_phone_number, c_email) 
VALUES (1, 'Иван', 'Иван','Иван', '89992228912', 'email@email.email');


insert into toc_assessment_employees (fk_assessment, fk_employee, fk_role) VALUES (1, 10, 1);
insert into toc_assessment_employees (fk_assessment, fk_employee, fk_role) VALUES (1, 11, 2);/