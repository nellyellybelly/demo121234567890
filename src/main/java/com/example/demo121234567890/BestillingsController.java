package com.example.demo121234567890;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BestillingsController {

    @Autowired
    private BestillingsRepository rep;

    //Setter opp kobling av BestillingsRepository for å kommunisere med databasen

    //Oppretter en liste for registrering av tilgjengelige filmer
    private final List<Film> filmRegister = new ArrayList<>();

    //konstruktør som legger til noen filmer i filmregisteret ved oppretting av objektet
    public BestillingsController(){
        Film film1 = new Film("Narnia");
        filmRegister.add(film1);
        Film film2 = new Film("Cars");
        filmRegister.add(film2);
        Film film3 = new Film("Mowgli");
        filmRegister.add(film3);
    }

    //Metoden som henter en liste over tilgjengelige filmer
    @GetMapping("/hentFilmer")
    public List<Film>hentFilmer(){
        return filmRegister;
    }

    //Metode for å lagre en ny kjoper i databasen
    @PostMapping("/lagre")
    public void lagreKunde(Kjoper innKjoper){rep.lagreKunde(innKjoper);}

    //Metode som henter alle kjopere fra databasen
    @GetMapping("/hentAlle")
    public List<Kjoper>hentAlle(){return rep.hentAlleFilmer();}

    //Metode for å slette alle kjopere fra databasen
    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleKunder();
    }
}