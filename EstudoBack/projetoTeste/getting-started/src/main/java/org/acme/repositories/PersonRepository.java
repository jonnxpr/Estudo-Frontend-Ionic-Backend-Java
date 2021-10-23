package org.acme.repositories;

import javax.enterprise.context.ApplicationScoped;

import org.acme.getting.entities.Person;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class PersonRepository implements PanacheRepository<Person> {

    // put your custom logic here as instance methods

    public Person findByName(String nome) {
        return find("nome", nome).firstResult();
    }
}