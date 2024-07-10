function criarAgente(){
    const nome = document.getElementById('nome').value;
    const telefoneagente = document.getElementById('telefoneagente');
    const descricao = document.getElementById('descricao').value;
    const email = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    const endereco = document.getElementById('endereco').value;

    telefoneagente = telefoneAgente.value.replace(/[()-\s]/g, "");
    const data = {
        nome: nome,
        telefoneagente: telefoneagente,
        descricao: descricao,
        email: email,
        tipo : tipo,
        endereco : endereco,
    }
    console.log(data);
    axios
        .post(`http://127.0.0.1:8080/${agenteId}`, data, {
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => {
            if(response.status == 201){
                alert("Agente cadastrado com SUCESSO!!")
                window.location.href = "/main/admin"
            }
        })
        .catch((err) =>{
            alert(`Erro ao Criar o Agente: ${err.message}`)
        })
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