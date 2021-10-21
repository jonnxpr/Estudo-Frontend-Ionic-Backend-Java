package org.acme.getting.started;

import javax.enterprise.context.ApplicationScoped;

import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class CRUDService {

    public JsonObject create(Pessoa pessoa) {
        return pessoa.getJson();
    }

    public int greeting(int n1, int n2) {
        return n1 + n2;
    }

    public String escreverHtml() {
        return "<h1>" + (new Pessoa("fasufhas", "472147812", 22).toString()) + "</h1>";
    }

}