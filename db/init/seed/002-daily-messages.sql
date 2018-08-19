insert into daily_messages (id, daily_message) values
    (1, 'Hi from the backend!!!'),
    (2, 'Coding is hard, but awesome.'),
    (3, 'We will make fat stacks coding'),
    (4, 'What is he even talking about?'),
    (5, 'Who even knows.'),
    (6, 'Is class almost over'),
    (7, 'We should grab some food after')
on conflict do nothing;
