// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Substitui qualquer caractere não numérico por uma string vazia

  // Verifica se o CPF tem exatamente 11 dígitos e não é uma sequência de números iguais
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;

  // Validação do primeiro dígito verificador
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;

  // Validação do segundo dígito verificador
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));
}

// Função para exibir mensagens de erro
function exibirMensagemErro(id, mensagem) {
  const elemento = document.getElementById(id);
  elemento.textContent = mensagem;
  elemento.style.display = mensagem ? "block" : "none";
}

// Adiciona o listener de evento de submit no formulário
document
  .getElementById("cadastro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value.trim();
    const nomeMae = document.getElementById("nome-mae").value.trim();
    const nomeCrianca = document.getElementById("nome-crianca").value.trim();

    // Limpa mensagens de erro anteriores
    exibirMensagemErro("cpf-error", "");
    exibirMensagemErro("nome-mae-error", "");
    exibirMensagemErro("nome-crianca-error", "");

    let formularioValido = true;

    // Valida CPF
    if (!validarCPF(cpf)) {
      exibirMensagemErro("cpf-error", "CPF inválido");
      formularioValido = false;
    }

    // Valida nome da mãe
    if (!nomeMae) {
      exibirMensagemErro("nome-mae-error", "Nome da mãe é obrigatório");
      formularioValido = false;
    }

    // Valida nome da criança
    if (!nomeCrianca) {
      exibirMensagemErro("nome-crianca-error", "Nome da criança é obrigatório");
      formularioValido = false;
    }

    // Se o formulário for válido, exibe mensagem de sucesso e redireciona
    if (formularioValido) {
      alert("Cadastro concluído! Você será redirecionado à página de login.");
      setTimeout(() => (window.location.href = "index.html"), 3000);
    }
  });
