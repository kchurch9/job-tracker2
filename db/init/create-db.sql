drop table if exists plans;
drop table if exists passhash;
drop table if exists users;
drop table if exists daily_messages;

drop database if exists project;
drop database if exists project_integration;
drop role if exists project_app;
drop role if exists project_read;

create role project_app login password 'projectdev' valid until 'infinity';
create role project_read login password 'projectdev' valid until 'infinity';
create database project;
create database project_integration;
