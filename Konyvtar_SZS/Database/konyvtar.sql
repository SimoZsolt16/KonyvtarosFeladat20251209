CREATE DATABASE konyvtar;
USE konyvtar;



CREATE TABLE Diak
(
    diakId INT AUTO_INCREMENT PRIMARY KEY,
    diakNeve VARCHAR(100) NOT NULL,
    diakOsztaly INT NOT NULL
);

CREATE TABLE Szerzo
(
    szerzoId INT AUTO_INCREMENT PRIMARY KEY,
    szerzoNeve VARCHAR(100) NOT NULL
);

CREATE TABLE Mufaj
(
    mufajId INT AUTO_INCREMENT PRIMARY KEY,
    mufajNev VARCHAR(50) NOT NULL
);

CREATE TABLE Konyv
(
    konyvId INT AUTO_INCREMENT PRIMARY KEY,
    konyvCime VARCHAR(200) NOT NULL,
    szerzoId INT NOT NULL,
    mufajId INT NOT NULL,
    FOREIGN KEY (szerzoId) REFERENCES Szerzo(szerzoId),
    FOREIGN KEY (mufajId) REFERENCES Mufaj(mufajId)
);

CREATE TABLE Kolcsonzes
(
    kolcsonzesId INT AUTO_INCREMENT PRIMARY KEY,
    kolcsonzesIdo TIME NOT NULL,
    diakId INT NOT NULL,
    konyvId INT NOT NULL,
    FOREIGN KEY (diakId) REFERENCES Diak(diakId),
    FOREIGN KEY (konyvId) REFERENCES Konyv(konyvId)
);



INSERT INTO Szerzo (szerzoNeve) VALUES
    ('Fekete Istvan'),
    ('Molnar Ferenc'),
    ('Dobrovits Aladár');

INSERT INTO Mufaj (mufajNev) VALUES
    ('Dráma');

INSERT INTO Diak (diakNeve, diakOsztaly) VALUES 
    ('Nok Edli', 8),
    ('Bekre Pál', 7),
    ('Nagy Lajos', 6);

INSERT INTO Konyv (konyvCime, szerzoId, mufajId) VALUES
    ('Vukk', 1, 1),
    ('A pál utcai fiúk', 2, 1),
    ('Bábel tornya', 3, 1);

INSERT INTO Kolcsonzes (kolcsonzesIdo, diakId, konyvId) VALUES
    ('08:25', 1, 1),
    ('09:00', 2, 2),
    ('09:15', 3, 3);