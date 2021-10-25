package org.acme.resources;

import java.util.List;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.acme.getting.entities.Person;
import org.acme.services.CRUDService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {

    @Inject
    CRUDService service;

    @GET
    public List<Person> list() {
        return service.list();
    }

    @GET
    @Path("/{id}")
    public Person get(@PathParam("id") long id) {
        return service.get(id);
    }

    @POST
    @Transactional
    public Response create(Person person) {
        return service.create(person);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Person update(@PathParam("id") long id, Person person) {
        return service.update(id, person);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") long id) {
        service.delete(id);
    }

    @GET
    @Path("/search/{nome}")
    public Person search(@PathParam("nome") String name) {
        return service.search(name);
    }

    @GET
    @Path("/count")
    public Long count() {
        return service.count();
    }
}
