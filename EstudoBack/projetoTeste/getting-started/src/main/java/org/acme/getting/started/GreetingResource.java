package org.acme.getting.started;

import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

@Path("/hello")
public class GreetingResource {

    @Inject
    CRUDService service;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/greeting/{n1}&{n2}")
    public int greeting(@PathParam int n1, @PathParam int n2) {
        return service.greeting(n1, n2);
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/escrever/")
    public String greeting() {
        return service.escreverHtml();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/create/{nome}&{cpf}&{idade}")
    public JsonArray create(@PathParam String nome, @PathParam String cpf, @PathParam int idade) {
        Pessoa p = new Pessoa(nome, cpf, idade);
        JsonArray jr = new JsonArray();
        jr.add(service.create(p));
        return jr;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "hello";
    }
}
