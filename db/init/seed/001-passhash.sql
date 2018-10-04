insert into passhash (user_handle, passhash, mod_date) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', '$2b$04$sgctMkkoiaFciYxoBUhdiOyaZ/yYwNjLvqWlRNS1DvOc8RWcxCDw2',  now()) /*123456*/
on conflict do nothing;
