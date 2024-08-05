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

function cadastrar() {
  // Verifica se os campos estão preenchidos
  const cpf = document.getElementById("cpf").value;
  const nomeMae = document.getElementById("nome-mae").value;
  const nomeCrianca = document.getElementById("nome-crianca").value;

  if (cpf && nomeMae && nomeCrianca) {
    if (validarCPF(cpf)) {
      alert(
        "Cadastro concluído. Você será redirecionado para a página de login em 5 segundos."
      );
      setTimeout(() => {
        window.location.href = "index.html";
      }, 5000); // Redireciona após 5 segundos (5000 ms)
    } else {
      alert("CPF inválido. Por favor, insira um CPF válido.");
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}
