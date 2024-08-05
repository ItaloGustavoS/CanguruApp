function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

function mostrarErro(elemento, mensagem) {
  const erroElemento = document.getElementById(`${elemento.id}-error`);
  erroElemento.textContent = mensagem;
  elemento.classList.add("input-error");
}

function limparErros() {
  const mensagensErro = document.querySelectorAll(".error-message");
  mensagensErro.forEach((mensagem) => (mensagem.textContent = ""));
  const inputsErro = document.querySelectorAll(".input-error");
  inputsErro.forEach((input) => input.classList.remove("input-error"));
}

function cadastrar(event) {
  event.preventDefault();
  limparErros();

  const cpf = document.getElementById("cpf");
  const nomeMae = document.getElementById("nome-mae");
  const nomeCrianca = document.getElementById("nome-crianca");

  if (cpf.value && nomeMae.value && nomeCrianca.value) {
    if (validarCPF(cpf.value)) {
      alert(
        "Cadastro concluído. Você será redirecionado para a página de login em 5 segundos."
      );
      setTimeout(() => {
        window.location.href = "index.html";
      }, 5000);
    } else {
      mostrarErro(cpf, "CPF inválido. Por favor, insira um CPF válido.");
    }
  } else {
    if (!cpf.value) mostrarErro(cpf, "Campo CPF é obrigatório.");
    if (!nomeMae.value)
      mostrarErro(nomeMae, "Campo Nome da Mãe é obrigatório.");
    if (!nomeCrianca.value)
      mostrarErro(nomeCrianca, "Campo Nome da Criança é obrigatório.");
  }
}

document.getElementById("cadastro-form").addEventListener("submit", cadastrar);
