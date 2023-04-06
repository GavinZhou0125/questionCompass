drop table if exists file_table;
create table file_table
(
    file_id     int auto_increment comment '文件id'
        primary key,
    file_name   varchar(255) not null comment '文件名',
    file_path   varchar(255) not null comment '文件路径',
    create_by   int          null comment '上传者',
    create_time datetime     null comment '上传时间',
    constraint file_id
        unique (file_id),
    constraint file_table_file_id_uindex
        unique (file_id)
)
    comment '文件表';

drop table if exists question_table;
create table question_table
(
    problem_id             int auto_increment comment '提问id'
        primary key,
    problem_title          varchar(255)  null comment '问题标题',
    problem_title_image_id int           null comment '问题标题图片',
    problem_content        text          not null comment '问题内容',
    problem_status         int           not null comment '问题状态',
    problem_answer_id      int           null comment '（如果是回复）问题的id',
    problem_tags           varchar(255)  null comment '问题标签',
    creator                int           not null comment '提问者id',
    create_time            datetime      not null comment '提问时间',
    updater                int           null comment '更新者id',
    update_time            datetime      null comment '更新时间',
    problem_reputation     int default 0 not null comment '提问的声望',
    problem_deleted        datetime      null,
    constraint question_table_problem_id_uindex
        unique (problem_id),
    constraint question_table_file_table_file_id_fk
        foreign key (problem_title_image_id) references file_table (file_id)
)
    comment '提问表';

create index question_table_creator_index
    on question_table (creator);

drop table if exists user;
create table user
(
    id          int auto_increment
        primary key,
    name        varchar(255)  not null,
    password    varchar(255)  not null,
    sex         int default 3 not null,
    age         int           null,
    birth       date          null,
    status      int default 1 not null,
    head_img    int           null,
    e_mail      varchar(255)  null,
    mobile      varchar(255)  not null,
    creator     varchar(255)  not null,
    create_time datetime      null,
    update_time datetime      null,
    is_deleted  int           null comment '是否被删除',
    constraint user_e_mail_uindex
        unique (e_mail),
    constraint user_id_uindex
        unique (id),
    constraint user_mobile_uindex
        unique (mobile),
    constraint user_phone_num_uindex
        unique (mobile),
    constraint user_file_table_file_id_fk
        foreign key (head_img) references file_table (file_id),
    constraint user_question_table_creator_fk
        foreign key (id) references question_table (creator),
    constraint user_question_table_creator_fk2
        foreign key (id) references question_table (creator)
);

create index user_head_img_index
    on user (head_img);

