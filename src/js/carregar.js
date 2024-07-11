$(document).ready(function() {
    axios
        .get("http://127.0.0.1:8080/agente")
        .then((response) => {
            if (response.status === 200) {
                const lista = response.data;
                for (const agente of lista) {
                    let linha = $("<tr/>");
                    linha.append($("<td/>").html(agente.nome));
                    linha.append($("<td/>").html(agente.descricao));
                    linha.append($("<td/>").html(agente.tipo));
                    linha.append($("<td style=\"white-space: pre-line\"/>")
                        .html(`Telefone: ${agente.telefone}\n Email: ${agente.email}`));
                    linha.append($("<td style=\"white-space: pre-line\"/>").html(`Cidade: ${agente.cidade?.nome ?? ""} \nLogradouro: ${agente.logradouro} \nNumero: ${agente.numero} \nCep: ${agente.cep} \nBairro: ${agente.bairro} \nComplemento: ${agente.complemento?? "Nada consta."}`));
                    linha.attr('data-id', agente.id);
                    $(tabelaAgentes).append(linha);
                }
            }
        })
        .catch((err) => {
            alert(`Erro não Mapeado: ${err.message}`)
        });

    // // Adicionar evento de clique nas linhas da tabela
    // $(document).on('click', '#tabelaAgentes tr', function(event) {
    //     const agenteId = $(this).data('id');

    //     // Verificar se o ícone de edição foi clicado
    //     if ($(event.target).hasClass('fa-pen-to-square')) {
    //         window.location.href = `/main/admin/atualizado/atualizar.html?agenteId=${agenteId}`;
    //     } else if (agenteId) {
    //         window.location.href = `/produtos/registro/movimentacao.html?agenteId=${agenteId}`;
    //     }
    // });
});
