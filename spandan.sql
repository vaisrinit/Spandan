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

CREATE SCHEMA POLITICS;

CREATE TABLE POLITICS.STATE(
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	capital VARCHAR,
	is_state BOOLEAN,
	statehood_day DATE,
	population BIGINT,
	area BIGINT,
	created_at TIMESTAMPTZ DEFAULT now(),
	edited_at TIMESTAMPTZ DEFAULT now()
);

\copy POLITICS.STATE (name ,capital ,is_state ,statehood_day ,population ,area ) FROM 'H:\My Drive\2024 Polls\datasets\states.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

CREATE TABLE POLITICS.PARL_CONST(
	id SERIAL PRIMARY KEY,
	state_id int references POLITICS.STATE(id),
	name VARCHAR,
	created_at TIMESTAMPTZ DEFAULT now(),
	edited_at TIMESTAMPTZ DEFAULT now()
);

\copy POLITICS.PARL_CONST (stated_id ,name ) FROM 'H:\My Drive\2024 Polls\datasets\parl_const.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

create table politics.general_election_summary(
	id serial primary key,
	pc_id int references politics.parl_const(id),
	election_year int,
	assembly_segments int,
	polling_stations int,
	electors bigint,
	male_votes int,
	female_votes int,
	third_gender_votes int,
	nri_votes int,
	postal_votes int,
	nominations int,
	contestants int,
	forefeited_deposits int,
	winner_name varchar,
	reservation varchar,
	contestant_category varchar,
	party varchar,
	party_symbol varchar,
	margin int,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);

\copy POLITICS.general_election_summary (pc_id,election_year,assembly_segments,polling_stations,electors, male_votes, female_votes, third_gender_votes, nri_votes, postal_votes,nominations,contestants,forefeited_deposits ,winner_name,reservation,contestant_category,party,party_symbol,margin) FROM 'H:\My Drive\2024 Polls\datasets\general_election_summary.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

CREATE TABLE POLITICS.map_links(
	id serial primary key,
	state_id int references politics.state(id),
	map_type varchar,
	link varchar,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);


alter table politics.parl_const rename column stated_id to sate_id;

create index state_index on politics.parl_const(sate_id);

CREATE SCHEMA SPORTS;

CREATE TABLE SPORTS.cricket_teams(
	id serial primary key,
	name varchar,
	owner varchar,
	league varchar,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);


\copy SPORTS.cricket_teams (name,owner,league) FROM 'H:\My Drive\ICC Cricket World Cup 2023\teams.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

DROP TABLE IF EXISTS SPORTS.cricket_venues;
CREATE TABLE SPORTS.cricket_venues(
	id serial primary key,
	name varchar,
	city varchar,
	state varchar,
	country varchar,
	owner varchar,
	capacity bigint,
	latitude numeric,
	longitude numeric,
	location GEOMETRY,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX cricket_venue_index
  ON SPORTS.cricket_venues
  USING GIST (geography(location));
  
\copy SPORTS.cricket_venues (name,city,state,country,owner,capacity,latitude,longitude,location) FROM 'H:\My Drive\ICC Cricket World Cup 2023\venues.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

CREATE TABLE SPORTS.cricket_leagues(
	id serial primary key,
	name varchar ,
	type varchar,
	administrator varchar,
	format varchar,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO SPORTS.cricket_leagues(name,type,administrator,format) VALUES ('Cricket World Cup','International','International Cricket Council','ODI');

CREATE TABLE SPORTS.cricket_fixtures(
	id serial primary key,
	league_id int references SPORTS.cricket_leagues(id),
	match_date DATE,
	team_1 int references SPORTS.cricket_teams(id),
	team_2 int references SPORTS.cricket_teams(id),
	venue int references SPORTS.cricket_venues(id),
	start_time TIME,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);

\copy SPORTS.cricket_fixtures (league_id,match_date,team_1,team_2,venue,start_time) FROM 'H:\My Drive\ICC Cricket World Cup 2023\fixtures.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

CREATE TABLE SPORTS.cricket_players(
	id serial primary key,
	international_team_id int references SPORTS.cricket_teams(id),
	name varchar,
	playing_role varchar,
	birth_day date,
	batting_style varchar,
	bowling_style varchar,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);

\copy SPORTS.cricket_players (international_team_id,name,playing_role,birth_day,batting_style,bowling_style) FROM 'H:\My Drive\ICC Cricket World Cup 2023\players.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',')

CREATE TABLE SPORTS.cricket_umpires(
	id serial primary key,
	name varchar,
	country varchar,
	date_of_birth date,
	gender varchar,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	edited_at TIMESTAMPTZ DEFAULT NOW()
);
alter table sports.cricket_leagues add column edition_title varchar;

create table sports.cricket_playing_11(
	id serial primary key,
	match_id int references sports.cricket_fixtures(id),
	team_id int references sports.cricket_teams(id),
	p1 int references sports.cricket_players(id),
	p2 int references sports.cricket_players(id),
	p3 int references sports.cricket_players(id),
	p4 int references sports.cricket_players(id),
	p5 int references sports.cricket_players(id),
	p6 int references sports.cricket_players(id),
	p7 int references sports.cricket_players(id),
	p8 int references sports.cricket_players(id),
	p9 int references sports.cricket_players(id),
	p10 int references sports.cricket_players(id),
	p11 int references sports.cricket_players(id),
	s1 int references sports.cricket_players(id),
	s2 int references sports.cricket_players(id),
	s3 int references sports.cricket_players(id),
	s4 int references sports.cricket_players(id),
	created_at timestamptz default now(),
	edited_at timestamptz default now()
);

alter table sports.cricket_umpires rename to cricket_officials;

alter table sports.cricket_officials add column is_umpire BOOLEAN;

create table sports.cricket_match_summary(
	id serial primary key,
	match_id int references sports.cricket_fixtures(id),
	captain_1 int references sports.cricket_players(id),
	captain_2 int references sports.cricket_players(id),
	toss_won_by int references sports.cricket_teams(id),
	choose_to varchar,
	umpire_1 int references sports.cricket_officials(id),
	umpire_2 int references sports.cricket_officials(id),
	umpire_3 int references sports.cricket_officials(id),
	match_referee int references sports.cricket_officials(id),
	inn1_score int,
	inn2_score int,
	inn1_wkt int,
	inn2_wkt int,
	winner int references sports.cricket_teams(id),
	run_margin int,
	wicket_margin int,
	balls_left int,
	man_of_the_match int references sports.cricket_players(id),
	match_link varchar,
	created_at timestamptz default now(),
	edited_at timestamptz default now()
);

alter table sports.cricket_fixtures add column match_no int;
update sports.cricket_fixtures set match_no=id;

create table sports.batting_details(
	id serial primary key,
	match_id int references sports.cricket_fixtures(id),
	player_id int references sports.cricket_players(id),
	runs int,
	balls int,
	fours int,
	sixes int,
	is_out boolean,
	out_type varchar,
	bowled_by int references sports.cricket_players(id),
	catch_by int references sports.cricket_players(id),
	stumped_by int references sports.cricket_players(id),
	run_out_by int references sports.cricket_players(id),
	created_at timestamptz default now(),
	edited_at timestamptz default now()
);

create table sports.bowling_details(
	id serial primary key,
	match_id int references sports.cricket_fixtures(id),
	player_id int references sports.cricket_players(id),
	overs int,
	balls int,
	maidens int,
	runs int,
	wickets int,
	no_balls int,
	wides int,
	created_at timestamptz default now(),
	edited_at timestamptz default now()
);

create table politics.eci_states(
	stateId int,
	statecode varchar primary key,
	countryCd varchar not null,
	stateType varchar not null,
	stateName varchar not null,
	stateNameHindi varchar not null,
	effectiveFrom date not null,
	effectiveTo date not null,
	isActive varchar not null,
	createdDttm timestamptz,
	modifiedBy varchar,
	modifiedDttm varchar,
	created_at timestamptz default now()
);
create table politics.eci_districts(
	state varchar references politics.eci_states(statecode),
	districtNo varchar,
	districtValue varchar,
	districtValueHindi varchar,
	effectiveFrom varchar,
	effectiveTo varchar,
	isActive varchar,
	createdBy varchar,
	createdDttm varchar,
	modifiedBy varchar,
	modifiedDttm varchar,
	districtCd varchar primary key,
	created_at timestamptz default now()
);

create table politics.eci_assemblies(
	asmblyNo int,
	stateCd varchar references politics.eci_states(statecode),
	districtCd varchar references politics.eci_districts(districtCd),
	asmblyName varchar,
	category varchar,
	asmblyNameL1 varchar,
	asmblyNameL2 varchar,
	categoryL1 varchar,
	categoryl2 varchar,
	effectiveFrom varchar,
	effectiveTo varchar,
	isActive varchar,
	createdBy varchar,
	createdDttm varchar,
	modifiedBy varchar,
	modifiedDttm varchar,
	languagePneumonicL1 varchar,
	languagePneumonicL2 varchar,
	pcNo varchar,
	prlmntNameL1 varchar,
	prlmntNameL2 varchar,
	prlmntCategoryL1 varchar,
	prlmntCategoryL2 varchar,
	acId int,
	created_at timestamptz default now()
);

create table politics.eci_parts(
	id serial primary key,
	partId int ,
	stateCd varchar references politics.eci_states(statecode),
	districtCd varchar references politics.eci_districts(districtCd),
	acNumber int,
	partNumber int,
	partName varchar,
	created_at timestamptz default now()
);