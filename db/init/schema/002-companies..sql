create table if not exists companies
(
    id uuid primary key not null default gen_random_uuid(),
    company_name text
);

grant select, insert, update, delete on table companies to project_app;
grant select on table companies to project_read;
