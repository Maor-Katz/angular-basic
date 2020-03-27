CREATE DATABASE family;

CREATE TABLE persons (
    id int auto_increment,
    name varchar(255) not null,
    nickname varchar(255) not null,
    description_person varchar(255) not null,
    primary key(id)
);

INSERT INTO persons (name, nickname, description_person)
VALUES ("maor katz", "mama", "The small one"),
 ("aviatar katz", "avia", "The big one"),
 ("nissim katz", "nisko", "Dad")


CREATE TABLE tasks (
    id int auto_increment,
    task_description varchar(255) not null,
    date datetime DEFAULT now(),
    person_id int not null,
    finished boolean DEFAULT false,
    primary key(id),
    foreign key (person_id) references persons(id)
);
--"finished" variable is for adding delete button for all fifnished tasks

INSERT INTO tasks (task_description, person_id)
VALUES ("throw out the garbege", 1),
("wash the cars", 2),
("install the cameras", 1)

