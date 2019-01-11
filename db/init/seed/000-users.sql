insert into users (user_handle,first_name, last_name, email, joined_date, is_admin) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', 'Ken', 'Church', 'kennychurch@hotmail.com', now(), true)
on conflict do nothing;
