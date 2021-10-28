package org.acme.services;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import org.acme.getting.entities.Person;

import java.net.URI;
import java.util.List;
import org.acme.repositories.PersonRepository;

@ApplicationScoped
public class PersonService {

    @Inject
    PersonRepository personRepository;

    public List<Person> list() {
        return Person.listAll();
    }

    public Person get(long id) {
        return Person.findById(id);
    }

    public Response create(Person person) {
        person.persist();
        return Response.created(URI.create("/persons/" + person.id)).build();
    }

    public Person update(long id, Person person) {
        Person entity = Person.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setNome(person.getNome());

        return entity;
    }

    public void delete(long id) {
        Person entity = Person.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }

    public void deleteAll() {
        List<Person> personList = Person.listAll();

        for (Person p : personList) {
            Person entity = Person.findById(p.id);
            if (entity == null) {
                throw new NotFoundException();
            }
            entity.delete();
        }
    }

    public Person search(String name) {
        return personRepository.findByName(name);
    }

    public Long count() {
        return Person.count();
    }
}