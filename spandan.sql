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

ALTER TABLE users DROP COLUMN password;

ALTER TABLE users ADD COLUMN salt varchar NOT NULL;
ALTER TABLE users ADD COLUMN hash_password varchar NOT NULL;

CREATE TABLE defence.exercise(
id serial primary key,
name varchar,
type varchar,
force varchar,
troop varchar,
countries varchar,
place varchar,
description varchar,
link varchar,
start_date timestamptz,
end_date timestamptz,
created_at timestamptz default now()
);