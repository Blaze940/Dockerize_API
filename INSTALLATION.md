# API_Docker

https://github.com/Nono77400/api_docker.git

1. Etape installation des images docker : 
    - docker build --tag api-docker .
    - docker network create dev
    - docker-compose build
    - docker-compose up


2. Etape mise en place bdd :

    - docker ps (pour récupérer le CONTAINER ID de l'image postgres)
    - docker exec -u postgres -it CONTAINER ID psql : cela vous dirigera directement dans la base de données 
    - \l    pour afficher les noms des tables
    - \c book     (book est le nom de la base de données POSTEGRES, et non le nom de la table qui elle s'appelle bookS)    pour se connecter à la base de données book
    - CREATE TABLE books(
        isbn  VARCHAR(13) NOT NULL,
        title VARCHAR(200) NOT NULL,
        author VARCHAR(150) NOT NULL,
        overview VARCHAR(1500),
        picture BYTEA,
        read_count INT DEFAULT 1,
        UNIQUE(isbn)
    );                          pour créer la table books

    - CREATE TABLE user(
        id INT PRIMARY KEY AUTOINCREMENT NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        password CHAR(10) NOT NULL,
        login VARCHAR(10) NOT NULL,
        UNIQUE(id)
    );                          pour créer la table user

    - INSERT INTO books(isbn,title,author,overview,picture,read_count) VALUES('81-1065','L\Insoutenable Légèreté des êtres','Louis-Ferdinand Céline','Bardamu raconte son expérience de la Première Guerre mondiale,
    du colonialisme','picture 2',7);     pour ajouter des données dans la table books
    
    - INSERT INTO user(firstname, lastname, password, login) VALUES ('testFirst', 'testLast', 'test123456', 'test');