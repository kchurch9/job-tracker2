create table if not exists daily_messages
(
    id integer primary key not null,
    daily_message text
);

grant select, insert, update, delete on table daily_messages to project_app;
grant select on table daily_messages to project_read;
