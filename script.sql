-- Active: 1655081577238@@127.0.0.1@3306@access

CREATE DATABASE IF NOT EXISTS pexelsbytxt;

USE pexelsbytxt;

CREATE TABLE
    IF NOT EXISTS logs (
        timestamp INT(12) NOT NULL,
        input VARCHAR(255) NOT NULL,
        query VARCHAR(255) NOT NULL,
        number TINYINT(4) NOT NULL,
        PRIMARY KEY (timestamp)
    )