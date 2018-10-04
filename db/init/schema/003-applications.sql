create table if not exists applications
(
    id uuid primary key not null default gen_random_uuid(),
    user_handle uuid not null,
    position text,
    company_id uuid,
    date timestamp
);

grant select, insert, update, delete on table applications to project_app;
grant select on table applications to project_read;