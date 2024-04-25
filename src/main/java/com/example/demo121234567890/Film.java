package com.example.demo121234567890;

public class Film {

    //Variable som lagrer typen av film
    private String type;

    //Konstruktør for Film
    public Film(String type){
        this.type=type;
    }
    public Film(){}

    //Get og set for å hente filmens type
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

