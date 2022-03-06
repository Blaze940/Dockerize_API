# API_Docker

# repo propre: https://github.com/Blaze940/Dockerize_API.git

other repo: https://github.com/Nono77400/api_docker.git, https://github.com/ShadowZ11/API_REST_Docker.git

1. Etape installation des images docker : 
    - docker build --tag Dockerize_Api .
    - docker network create dev
    - docker-compose build
    - docker-compose up


2. Etape mise en place bdd :

- docker ps                                                     #pour récupérer le CONTAINER ID de l'image postgres
    - docker exec -u postgres -it CONTAINER ID psql             #dirige directement dans la base de données 
    - \l                                                        #pour afficher les noms des tables
    - \c book     (book est le nom de la base de données POSTEGRES, et non le nom de la table qui elle s'appelle bookS)    #pour se connecter à la base de données book
    - CREATE TABLE books(
        isbn  VARCHAR(13) NOT NULL,
        title VARCHAR(200) NOT NULL,
        author VARCHAR(150) NOT NULL,
        overview VARCHAR(1500),
        picture BYTEA,
        read_count INT DEFAULT 1,
        UNIQUE(isbn)
    );                          #pour créer la table books

    - CREATE TABLE users(
        id SERIAL PRIMARY KEY NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        password CHAR(10) NOT NULL,
        email VARCHAR(25) NOT NULL,
        login VARCHAR(10) NOT NULL,
        UNIQUE (login)
    );                          #pour créer la table user

    - INSERT INTO books(isbn,title,author,overview,picture,read_count) VALUES('81-1065','L\Insoutenable Légèreté des êtres','Louis-Ferdinand Céline','Bardamu raconte son expérience de la Première Guerre mondiale, du colonialisme','picture 2',7);               #pour ajouter des données dans la table books

    - INSERT INTO users(firstname, lastname, password, email, login) VALUES ('testFirst', 'testLast', 'test123456', 'test@test.fr', 'test');