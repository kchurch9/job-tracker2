create table if not exists cohort
(
    cohort_handle uuid references id(cohort_id),
    cohort_name text not null,
    cohort_code text not null
);
grant select, insert, update, delete on table cohort to project_app;
grant select on table cohort to project_read;