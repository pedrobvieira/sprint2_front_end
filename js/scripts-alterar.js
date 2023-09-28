const idPk = sessionStorage.getItem("idPk")
const nomeItem = sessionStorage.getItem("nomeItem")
const cpf = sessionStorage.getItem("cpf")
const telefone = sessionStorage.getItem("telefone")
const cep = sessionStorage.getItem("cep")
const comentario = sessionStorage.getItem("comentario")

console.log(idPk,nomeItem,cpf)

document.querySelector("[name='nomeItem']").value = nomeItem
document.querySelector("[name='cpf']").value = cpf
document.querySelector("[name='telefone']").value = telefone
document.querySelector("[name='cep']").value = cep
document.querySelector("[name='comentario']").value = comentario


function Alterar() {
  const idPk = sessionStorage.getItem("idPk")
  const nomeItem = document.getElementById("nomeItem").value
  const cpf = document.getElementById("cpf").value
  const telefone = document.getElementById("telefone").value
  const cep = document.getElementById("cep").value
  const comentario = document.getElementById("comentario").value

  var cpf_tab = []

  if (nomeItem === '') {
    alert("Escreva o nome do cliente!");
  } else if (cpf_tab.indexOf(cpf) === -1) {
    alert("Cpf inválido!");
  } else if (isNaN(telefone)) {
    alert("Telefone precisa ser númerico!");
  } else if (telefone <= 0) {
    alert("Telefone precisa ser maior do que zero!");
  } else if (cep === '') {
    alert("O cep precisa ser preenchido!");
  } else {
    alteraItem(idPk, nomeItem, cpf, telefone, cep, comentario)
    alert("Alterado!")
    window.location.href = "index.html"
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista do servidor via requisição UPDATE
  --------------------------------------------------------------------------------------
*/
const alteraItem = async (id, nome, cpf, telefone, cep, comentario) => {

  const formData = new FormData();
  formData.append('id', id);
  formData.append('nome', nome);
  formData.append('cpf', cpf);
  formData.append('telefone', telefone);
  formData.append('cep', cep);
  formData.append('comentario', comentario);

  console.log('alterar chave:', id)

  let url = 'http://127.0.0.1:5000/alterar_cliente';
  fetch(url, {
    method: 'put',
    body: formData
  })
  .then((response)  => response.json())
  .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para cancelar a alteração e voltar para a tela principal
  --------------------------------------------------------------------------------------
*/
function Cancelar() {
  window.location.href = "index.html"
}