package org.acme.getting.started;

import javax.enterprise.context.ApplicationScoped;

import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class CRUDService {

    public JsonObject create(Pessoa pessoa) {
        return pessoa.getJson();
    }

    public JsonObject login(String cpf) {
        JsonObject js = new JsonObject();
        if (cpf.equals("07310124618")) {
            js.put("logar", true);
            js.put("cpf", cpf);
        } else {
            js.put("logar", false);
            js.put("cpf", null);
        }

        return js;
    }

    public int greeting(int n1, int n2) {
        return n1 + n2;
    }

    public String escreverHtml() {
        return "<h1>" + (new Pessoa("fasufhas", "472147812", 22).toString()) + "</h1>";
    }

}