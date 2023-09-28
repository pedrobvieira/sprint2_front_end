/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/buscar_cliente';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(item => insertList(item.id, item.nome, item.cpf, item.telefone, item.cep,item.comentario))
    })
    .catch(error => {
      console.error('Error:', error);
    })
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

console.log('1')

var nome = sessionStorage.getItem('nomeLogin');

if (nome) {
  console.log('2', nome);
  document.getElementById('login-mostrar').innerHTML = 'Usuario: ' + nome
  /*document.querySelector('login-mostrar').textContent = nome
  const elemento = document.getElementsByName('login-mstrar').textContent = 'Usuario: ' + nome;
  */
  getList();
} else {
  console.log('3')
}

/*
  --------------------------------------------------------------------------------------
  Fazer o Login
  --------------------------------------------------------------------------------------
*/

function login() {
  sessionStorage.setItem("nomeLogin", " ")
  window.location = "login.html";
}




/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idPk = div.getElementsByTagName('td')[0].innerHTML
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      const Cpf = div.getElementsByTagName('td')[2].innerHTML
      const Telefone = div.getElementsByTagName('td')[3].innerHTML
      const Data_cliente = div.getElementsByTagName('td')[4].innerHTML
      console.log(idPk)
      if (confirm("Tem certeza que quer deletar a cliente ?")) {
        div.remove()
        deleteItem(idPk,nomeItem, Cpf, Telefone, Data_cliente)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (idPk, nomeItem, Cpf, Telefone, Cep) => {
  console.log(idPk,Cpf, Telefone, Cep)
  let url = "http://127.0.0.1:5000/deletar_cliente?id=" + idPk + "&nome=" + nomeItem + "&cpf=" + Cpf + "&telefone=" + Telefone + "&cep=" + Data_cliente;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch(error => {
      console.error('Error:', error);
    })
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item da lista de acordo com o click no botão alterar
  --------------------------------------------------------------------------------------
*/
const alteraElement = () => {
  let altera = document.getElementsByClassName("altera");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < altera.length; i++) {
    altera[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idPk = div.getElementsByTagName('td')[0].innerHTML
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      const cpf = div.getElementsByTagName('td')[2].innerHTML
      const telefone = div.getElementsByTagName('td')[3].innerHTML
      const cep = div.getElementsByTagName('td')[4].innerHTML
      const comentario = div.getElementsByTagName('td')[5].innerHTML
      if (confirm("Tem certeza que quer alterar a cliente ?")) {
        sessionStorage.setItem("idPk", idPk)
        sessionStorage.setItem("nomeItem", nomeItem)
        sessionStorage.setItem("cpf", cpf)
        sessionStorage.setItem("telefone", telefone)
        sessionStorage.setItem("cep", cep)
        sessionStorage.setItem("comentario", comentario)
        alterar()


      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Alterar uma cliente
  --------------------------------------------------------------------------------------
*/
function alterar() {
  window.location.href = "alterar.html";
}


/*
  -----------__---------------------------------------------------------------------------
  Função adiciona um novo item com nome, cpf, telefone, cep e comentário
  ----------__----------------------------------------------------------------------------
*/

const newItemLog = () => {
  var nome = sessionStorage.getItem('nomeLogin');

  if (nome) {
    a = newItem()
  } else {
    alert("Você não está logado no sistema")
  }
}



const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputCpf = document.getElementById("newCpf").value;
  let inputTelefone = document.getElementById("newTelefone").value;
  let inputCep = document.getElementById("newCep").value;
  let inputComentario = document.getElementById("newComentario").value;

  var cpf = ["Casa", "Pessoal", "Transporte", "Familia","Banco"]

  if (inputNome === '') {
    alert("Escreva o nome da cliente!");
  } else if (cpf.indexOf(inputCpf) === -1) {
     alert("Cpf inválida!");
  } else if (isNaN(inputTelefone)) {
    alert("Telefone precisa ser númerico!");
  } else if (inputTelefone <= 0){
    alert("Telefone precisa ser maior do que zero!");
  } else if (inputCep ==='') {
      alert("O cep precisa ser preenchido!");
  } else {
    insertList(" ", inputNome, inputCpf, inputTelefone, inputCep, inputComentario)
    postItem(inputNome, inputCpf, inputTelefone, inputCep, inputComentario)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (Id, Nome, Cpf, Telefone, Cep, Comentario ) => {
  var ano = Cep.substr(0,4)
  var mes = Cep.substr(5,2)
  var dia = Cep.substr(8,2)
  var diamesano = dia + "/" + mes + "/" + ano
  var item = [Id, Nome, Cpf, Telefone, diamesano, Comentario]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButtondel(row.insertCell(-1))
  insertButtonalt(row.insertCell(-1))
  document.getElementById("newNome").value = "";
  document.getElementById("newCpf").value = "";
  document.getElementById("newTelefone").value = "";
  document.getElementById("newCep").value = "";
  document.getElementById("newComentario").value = "";

  removeElement()
  alteraElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtondel = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de alteração para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonalt = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00AA");
  span.className = "altera";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputCpf, inputTelefone, inputCep, inputComentario) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('cpf', inputCpf);
  formData.append('telefone', inputTelefone);
  formData.append('cep', inputCep);
  formData.append('comentario', inputComentario);

  let url = 'http://127.0.0.1:5000/incluir_cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch(error => {
      console.error('Error:', error);
    })
}
