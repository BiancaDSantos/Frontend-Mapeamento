document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const agenteId = urlParams.get('agenteId');

    if (agenteId) {
        document.getElementById('formTitle').textContent = "Atualizar Agente";
        carregarAgente(agenteId);
    }
});

function carregarAgentes(agenteId) {
    axios.get(`http://127.0.0.1:8080/agente/${agenteId}`)
        .then(response => {
            if (response.status === 200) {
                const agente = response.data;
                document.getElementById('nome').value = agente.nomeagente;
                document.getElementById('telefoneagente').value = agente.telefoneagente;
                document.getElementById('descricao').value = agente.descricao;
                document.getElementById('email').value = agente.email;
                document.getElementById('tipo').value = agente.tipo;
                document.getElementById('endereco').value = agente.endereco;
                document.getElementById('salvarButton').textContent = "Atualizar";
                console.log(agente)
                
            } else {
                alert("Erro ao carregar dados do Agente.");
            }
        })
        .catch(error => {
            alert(`Erro ao carregar dados do Agente: ${error.message}`);
        });
        
}

function salvarAgente() {
    const urlParams = new URLSearchParams(window.location.search);
    const agenteId = urlParams.get('agenteId');

    const nome = document.getElementById('nome').value;
    const telefoneagente = document.getElementById('telefoneagente');
    const descricao = document.getElementById('descricao').value;
    const email = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    const endereco = document.getElementById('endereco').value;

    const dataToSend = {
        nome: nome,
        telefoneagente: telefoneagente.value,
        descricao: descricao,
        email: email,
        tipo : tipo,
        endereco : endereco,
        
    };
    if (agenteId) {
        axios.put(`http://127.0.0.1:8080/agente/${agenteId}`, dataToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert("Agente atualizado com sucesso!");
                window.location.href = `/main/admin/index.html`;
            } else {
                alert("Erro ao atualizar o Agente.");
            }
        })
        .catch(error => {
            alert(`Erro ao atualizar o Agente: ${error.message}`);
        });
    } else {
        axios.post( `http://127.0.0.1:8080/agente/${agenteId}`, dataToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 201) {
                alert("Agente criado com sucesso!");
                window.location.href = `/main/admin/index.html`;
            } else {
                alert("Erro ao criar o Agente.");
            }
        })
        .catch(error => {
            alert(`Erro ao criar o Agente: ${error.message}`);
        });
    }
}
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }