create database spandan;

create table users (
	id bigserial not null primary key,
	email varchar not null,
	name varchar,
	password varchar not null,
	created_on timestamp with time zone default now()
);

create table users (
	id bigserial not null primary key,
	email varchar not null,
	name varchar,
	password_hash varchar not null,
	salt varchar not null,
	created_on timestamp with time zone default now()
);

drop table if EXISTS users;
create table users (
	id bigserial not null primary key,
	email varchar not null unique,
	name varchar,
	password varchar not null,
	created_on timestamp with time zone default now()
);

ALTER TABLE users add column is_admin BOOLEAN DEFAULT FALSE;