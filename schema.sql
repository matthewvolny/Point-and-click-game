CREATE TABLE user_info (
    id serial,
    user_id int primary key not null,
    user_name text not null CHECK (user_name <> ''),
    user_password text not null CHECK (user_password <> ''),  
    current_room int,
    game_state text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_inventory (
    user_id int references user_info(user_id),
    items text
);

CREATE TABLE user_roomInfo (
    user_id int references user_info(user_id),
    room_num int,
    items_collected text
);