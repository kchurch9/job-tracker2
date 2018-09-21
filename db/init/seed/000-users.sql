insert into users (user_handle,first_name, last_name, email, joined_date) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', 'Ken', 'Church', 'kennychurch@hotmail.com', now())
on conflict do nothing;
