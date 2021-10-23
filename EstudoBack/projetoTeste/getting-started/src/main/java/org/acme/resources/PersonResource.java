package org.acme.resources;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.acme.getting.entities.Person;
import org.acme.repositories.PersonRepository;
import org.acme.services.CRUDService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {

    @Inject
    CRUDService service;
    @Inject
    PersonRepository personRepository;

    @GET
    public List<Person> list() {
        return Person.listAll();
    }

    @GET
    @Path("/{id}")
    public Person get(@PathParam("id") Long id) {
        return Person.findById(id);
    }

    @POST
    @Transactional
    public Response create(Person person) {
        person.persist();
        return Response.created(URI.create("/persons/" + person.id)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Person update(@PathParam("id") Long id, Person person) {
        Person entity = Person.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }

        // map all fields from the person parameter to the existing entity
        entity.setNome(person.getNome());

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Person entity = Person.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }

    @GET
    @Path("/search/{nome}")
    public Person search(@PathParam("nome") String name) {
        return personRepository.findByName(name);
    }

    @GET
    @Path("/count")
    public Long count() {
        return Person.count();
    }
}
