create extension if not exists pgcrypto;
create extension if not exists pg_stat_statements;

create table if not exists users
(
    user_handle uuid primary key default gen_random_uuid(),
    first_name text,
  	last_name text,
    email text,
    joined_date timestamp,
    is_admin boolean,
    cohort_id uuid
);
grant select, insert, update, delete on table users to project_app;
grant select on table users to project_read;
