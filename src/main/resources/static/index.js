$(function (){
    hentAlleFilmer();
})

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

function finnTyper(){
    const valgtType = $("#valgtType").val();
    $.get("/hentFilmer",function (filmer){
        formaterFilmer(filmer,valgtType);
    });
}

// Funksjon for å registrere en kjøper
function regKjoper() {
    const kjoper = {
        film: $("#valgtType").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        antall: $("#antall").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    // Valideringer og feilmeldinger på hva de ulike inputboksene skal inneholde
    let feilTeller = 0;

    if (kjoper.film === "Velg Film" || kjoper.film === "") {
        $("#typeError").html("Velg Film!");
        feilTeller++;
    } else {
        $("#typeError").html(""); // Fjerner feilmeldingen hvis filmvalget er gyldig
    }

    if (isNaN(kjoper.antall) || kjoper.antall === "") {
        $("#antallError").html("Skriv inn antall!");
        feilTeller++;
    } else {
        $("#antallError").html("");
    }

    if (kjoper.fornavn === "") {
        $("#fornavnError").html("Skriv inn fornavn");
    } else {
        $("#fornavnError").html("");
    }

    if (kjoper.etternavn === "") {
        $("#etternavnError").html("Skriv inn etternavn");
    } else {
        $("#etternavnError").html("");
    }

    // Validering som sier at telefonNR må inneholde 8-siffer
    if (kjoper.telefonnr === "" || !(/^\d{8}$/.test(kjoper.telefonnr))) {
        $("#telefonnrError").html("Skriv inn korrekt telefonummer, må inneholde 8 siffer");
    } else {
        $("#telefonnrError").html("");
    }

    // Validering som sier at epost må inneholde @
    if (kjoper.epost === "" || !kjoper.epost.includes("@")) {
        $("#epostError").html("Skriv inn Epost, den må inneholde @");
    } else {
        $("#epostError").html("");
    }
}