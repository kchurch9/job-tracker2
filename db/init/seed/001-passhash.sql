insert into passhash (user_handle, passhash, mod_date) values
    ('037b4897-8a2a-46b6-8ed7-47a555bb40f2', '$2y$12$8sUef58krxjU93upSYZZl.kqu4hhq0StzYPo6YGoafe5mDnaccy5O',  now())
on conflict do nothing;
