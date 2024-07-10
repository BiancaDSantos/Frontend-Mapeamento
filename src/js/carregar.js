$(document).ready(function() {
    axios
        .get("http://127.0.0.1:8080/produtos/carregar")
        .then((response) => {
            if (response.status === 200) {
                const lista = response.data;
                for (const agente of lista) {
                    let linha = $("<tr/>");
                    linha.append($("<td/>").html(agente.nome));
                    linha.append($("<td/>").html(agente.codigodebarras));
                    linha.append($("<td/>").html(agente.descricao));
                    linha.append($("<td/>").html(agente.estoque));
                    linha.append($("<td>").html("<i class='fa-solid fa-xmark' style='color: #fd0d0d;'></i><i class='fa-solid fa-pen-to-square' style='color: #3dff6e; margin-left: 10px;'></i>"));
                    linha.attr('data-id', agente.id);
                    $(tabelaAgentes).append(linha);
                }
            }
        })
        .catch((err) => {
            alert(`Erro não Mapeado: ${err.message}`)
        });

    // Adicionar evento de clique nas linhas da tabela
    $(document).on('click', '#tabelaAgentes tr', function(event) {
        const agenteId = $(this).data('id');

        // Verificar se o ícone de edição foi clicado
        if ($(event.target).hasClass('fa-pen-to-square')) {
            window.location.href = `/main/admin/atualizado/atualizar.html?agenteId=${agenteId}`;
        } else if (agenteId) {
            window.location.href = `/produtos/registro/movimentacao.html?agenteId=${agenteId}`;
        }
    });
});