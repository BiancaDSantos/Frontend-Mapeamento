$(document).ready(function() {
    axios
        .get("http://127.0.0.1:8080/agente")
        .then((response) => {
            if (response.status === 200) {
                const lista = response.data;
                for (const agente of lista) {
                    let linha = $("<tr/>");
                    linha.append($("<td/>").html(agente.nome));
                    linha.append($("<td/>").html(agente.tipo));
                    linha.append($("<td style=\"white-space: pre-line\"/>")
                        .html(`Telefone: ${agente.telefone}\n Email: ${agente.email}`));
                    // linha.append($("<td/>").html(agente.telefone));
                    // linha.append($("<td/>").html(agente.email));
                    linha.append($("<td style=\"white-space: pre-line\"/>").html(`${agente.cidade?.nome ?? ""} `));
                    linha.attr('data-id', agente.id);
                    linha.attr('data-info', `Descrição: ${agente.descricao}\nEndereço: ${agente.cidade?.nome ?? ""}, ${agente.logradouro}, ${agente.numero}, ${agente.cep}, ${agente.bairro}, ${agente.complemento}`);
                    $('#tabelaAgentes tbody').append(linha);
                    $(tabelaAgentes).append(linha);
                }
            }
        })
        .catch((err) => {
            alert(`Erro não Mapeado: ${err.message}`)
        });

        const modal = document.getElementById("modal");
        const modalText = document.getElementById("modal-text");
        const span = document.getElementsByClassName("close")[0];
    
        // Adicionar evento de clique nas linhas da tabela
        $(document).on('click', '#tabelaAgentes tr', function(event) {
            const agenteId = $(this).data('id');
    
            // Verificar se o ícone de edição foi clicado
            if ($(event.target).hasClass('fa-pen-to-square')) {
                window.location.href = `/main/admin/atualizado/atualizar.html?agenteId=${agenteId}`;
            } else if ($(event.target).hasClass('fa-xmark')) {
                // Aqui você pode adicionar a lógica para excluir o agente, se necessário
            } else if (agenteId) {
                const info = $(this).data('info');
                modalText.textContent = info.replace(/\n/g, '\n'); // Substituir as quebras de linha por <br> se necessário
                modal.style.display = "block";
            }
        });
    
        span.onclick = function() {
            modal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });