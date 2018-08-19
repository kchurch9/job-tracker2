insert into passhash (user_handle, passhash, mod_date) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', '$2y$12$8sUef58krxjU93upSYZZl.kqu4hhq0StzYPo6YGoafe5mDnaccy5O',  now()),
    ('4bf29015-08c1-44e6-9e6c-2759a7515381', '$2a$04$V8MQcJeRn7yFrhEJt2.7ROuk48Hbs9J3rhI2pco6pZN.7V9/CCYpK',  now())
on conflict do nothing;
