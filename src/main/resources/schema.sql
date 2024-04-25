CREATE TABLE Kjoper
--Kode for å opprette tabellen Kjoper
(
    id INTEGER AUTO_INCREMENT NOT NULL, --hver bestilling har en unik id
    film VARCHAR(255) NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    antall INT NOT NULL,
    telefonnr INT NOT NULL,
    epost VARCHAR(255) NOT NULL,

    --All annen informasjon

    PRIMARY KEY (id) ---setter id til primærnøkkel fordi det er den eneste verdien som ikke kan være den samme
);