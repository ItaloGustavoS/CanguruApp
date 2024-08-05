function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  return resto === parseInt(cpf.charAt(10));
}

document
  .getElementById("cadastro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value;
    const nomeMae = document.getElementById("nome-mae").value;
    const nomeCrianca = document.getElementById("nome-crianca").value;

    document.getElementById("cpf-error").textContent = "";
    document.getElementById("nome-mae-error").textContent = "";
    document.getElementById("nome-crianca-error").textContent = "";

    if (!validarCPF(cpf)) {
      document.getElementById("cpf-error").textContent = "CPF inválido";
      return;
    }

    if (nomeMae.trim() === "") {
      document.getElementById("nome-mae-error").textContent =
        "Nome da mãe é obrigatório";
      return;
    }

    if (nomeCrianca.trim() === "") {
      document.getElementById("nome-crianca-error").textContent =
        "Nome da criança é obrigatório";
      return;
    }

    alert("Cadastro concluído! Você será redirecionado à página de login.");

    setTimeout(function () {
      window.location.href = "index.html";
    }, 5000);
  });
