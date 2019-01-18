create table if not exists cohort
(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    code text not null
);
grant select, insert, update, delete on table cohort to project_app;
grant select on table cohort to project_read;