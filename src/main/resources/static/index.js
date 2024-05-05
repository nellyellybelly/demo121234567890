
//Funksjon som utføres når dokumentet er ferdig lastet
$(function (){
    hentAlleFilmer();
});

// Funksjon for å hente filmer fra serveren
function hentAlleFilmer(){
    $.get("/hentFilmer",function (filmer){
        formaterFilmer(filmer);

    });
}

//funksjon for å formatere filmene og vise dem i en dropdown-liste
function formaterFilmer(filmer){
    let ut = "<select id='valgtType'>"
    let forrigeType = "";
    ut += "<option>Velg Film</option>";

    //går gejnnom filmene og legger til i en dropdown-liste
    for (const film of filmer){
        if (forrigeType !== film.type){
            ut += "<option>" + film.type + "</option>";
        }
        forrigeType=film.type;
    }
    ut += "</select>"
    $("#type").html("<td>Type:</td><td>" + ut + "</td>");
}

// Funksjon for å hente data fra serveren basert på valgt filmtype
function finnTyper(){
    const valgtType = $("#valgtType").val();
    $.get("/hentFilmer",function (filmer){
        formaterFilmer(filmer,valgtType);
    });
}

//Funksjon for å registrere en kjøper
function regKjoper() {
    const kjoper = {
        film: $("#valgtType").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        antall: $("#antall").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };


    const filmError = $("#typeError");
    const fornavnError = $("#fornavnError");
    const etternavnError = $("#etternavnError");
    const antallError = $("#antallError");
    const telefonnrError = $("#telefonnrError");
    const epostError = $("#epostError");

    filmError.html("");
    fornavnError.html("");
    etternavnError.html("");
    antallError.html("");
    telefonnrError.html("");
    epostError.html("");

    let feilTeller = 0;


    //Valideringer og feilmeldinger på hva de ulike inputboksene skal inneholde


    //Fikk ikke til å få feilmeldingen til å være ved siden av nedtrekkslisten så den ble under
    if (kjoper.film === "Velg Film") {
        filmError.html("Velg Film!");
        feilTeller++;
    } else {
        filmError.html(""); // Fjerner feilmeldingen hvis filmvalget er gyldig
    }

    if (isNaN(kjoper.antall) || kjoper.antall === "") {
        antallError.html("Skriv inn antall!");
        feilTeller++;
    } else {
        antallError.html("");
    }
    if (kjoper.fornavn === "") {
        fornavnError.html("Skriv inn fornavn");
        feilTeller++;
    } else {
        fornavnError.html("");
    }
    if (kjoper.etternavn === "") {
        etternavnError.html("Skriv inn etternavn");
        feilTeller++;
    } else {
        etternavnError.html("");
    }
    //Validering som sier at telefonNR må inneholde 8-siffer
    if (kjoper.telefonnr === "" || !(/^\d{8}$/.test(kjoper.telefonnr))) {
        telefonnrError.html("Skriv inn korrekt telefonummer, må inneholde 8 siffer");
        feilTeller++;
    } else {
        telefonnrError.html("");
    }
    //Validering som sier at epost må inneholde @
    if (kjoper.epost === "" || !kjoper.epost.includes("@")) {
        epostError.html("Skriv inn Epost, den må inneholde @");
        feilTeller++;
    } else {
        epostError.html("");
    }
// Utfører en POST-forespørsel til /lagre-endepunktet på serveren med kjøperobjektet
    if (feilTeller === 0) {
        $.post("/lagre", kjoper, function(){
            hentAlle();
        });
    }

}

// Funksjon for å hente alle registrerte data fra serveren, formatere dem og oppdatere visningen
function hentAlle() {
    $.get("/hentAlle", function (data) {
        formaterData(data);
    });
    $("#fornavn").val(""); //tøm input-feltene
    $("#etternavn").val("");
    $("#antall").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

// Funksjon for å formatere dataene og vise dem i tabellen
function formaterData(kjopere) {

    let ut = "<table><tr><th>Film</th><th>Fornavn</th><th>Etternavn</th><th>Antall</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (const kjoper of kjopere) {
        ut += "<tr><td>" + kjoper.film + "</td><td>" + kjoper.fornavn + "</td><td>" + kjoper.etternavn + "</td><td>" + kjoper.antall + "</td><td>" + kjoper.telefonnr + "</td><td>" + kjoper.epost + "</td></tr>";
    }
    ut += "</table>";
    $("#kjoperne").html(ut);

}

//Funksjon for å slette alle kjøpere fra serveren og tømme visningen
function slettKjoperne() {
    // Sender en GET-request til serveren for å slette alle kjøpere
    $.get( "/slettAlle", function() {
        $("#kjoperne").empty();


        //Vet at dette ikke er riktig måte å skrive jQuery, men har prøvd de måtene ovenfor å
        // de gir ikke resultatet jeg vil ha med å slette overskriftene
        //$("#kjoperne").html("");
        //document.getElementById("kjoperne").innerHTML = "";
        //$("#kjoperne").innerHTML("");

        // Tømmer tekstfeltene
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#antall").val("");
        $("#telefonnr").val("");
        $("#epost").val("");


        // Tømmer overskriftene

        $("#fornavnError").html("");
        $("#etternavnError").html("");
        $("#antallError").html("");
        $("#telefonnrError").html("");
        $("#epostError").html("");


        //Var eneste måten jeg klarte å overskriftene i tabellen til å bli slettet ved "Slett Data"
        // var å ikke bruke denne hentAlle()metoden
        //hentAlle();
    });
}