insert into users (user_handle, username, first_name, middle_name, last_name, suffix, email, joined_date) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', 'USA', 'Ken', 'P', 'Harlot', '', 'kchurch9@hotmail.com', now()),
    ('4bf29015-08c1-44e6-9e6c-2759a7515381', 'USSR', 'Dan', 'R', 'Saldivar', '', 'Dan@aol.com',now())
on conflict do nothing;
