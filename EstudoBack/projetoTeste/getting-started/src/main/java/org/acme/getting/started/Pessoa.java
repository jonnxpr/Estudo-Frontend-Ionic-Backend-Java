package org.acme.getting.started;

import com.fasterxml.jackson.annotation.JsonCreator;

import io.quarkus.vertx.http.runtime.devmode.Json;
import io.vertx.core.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pessoa {
    private String nome;
    private String cpf;
    private int idade;

    public JsonObject getJson() {
        JsonObject json = new JsonObject();
        json.put("nome", this.nome);
        json.put("cpf", this.cpf);
        json.put("idade", this.idade);
        return json;
    }

    public void fromJson(JsonObject json) {
        this.nome = json.getString("nome");
        this.cpf = json.getString("cpf");
        this.idade = json.getInteger("idade");
    }
}
