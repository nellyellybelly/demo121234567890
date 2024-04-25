package com.example.demo121234567890;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BestillingsRepository {

    //legger til JdbcTemplate for å kunne utføre SQL-operasjoner
    @Autowired
    private JdbcTemplate db;

    //Metode for å lagre en ny kjoper i databasen
    public void lagreKunde(Kjoper innKjoper){

        //Utfører en SQL INSERT for å legge til ny kjøper i databasen
        String sql = "INSERT INTO Kjoper(film,fornavn,etternavn,antall,telefonnr,epost)VALUES(?,?,?,?,?,?)";
        db.update(sql,innKjoper.getFilm(),innKjoper.getFornavn(),innKjoper.getEtternavn(),innKjoper.getAntall(),innKjoper.getTelefonnr(),innKjoper.getEpost());
    }
    public List<Kjoper>hentAlleFilmer(){

        //// Utfører en SQL SELECT-operasjon for å hente alle kjøpere fra databasen, sortert etter etternavn
        String sql="SELECT * FROM Kjoper ORDER BY etternavn";
        List<Kjoper> alleKjopere = db.query(sql, new BeanPropertyRowMapper<>(Kjoper.class));
        return alleKjopere;
    }
    public void slettAlleKunder(){

        // Utfører en SQL DELETE-operasjon for å slette alle kjøpere fra databasen
        String sql = "DELETE FROM Kjoper";
        db.update(sql);

    }
}