// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Substitui qualquer caractere não numérico por uma string vazia

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
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

// Função para enviar dados do formulário de cadastro
async function enviarDadosCadastro(event) {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value.trim();
  const nomeMae = document.getElementById("nome-mae").value.trim();
  const nomeCrianca = document.getElementById("nome-crianca").value.trim();

  exibirMensagemErro("cpf-error", "");
  exibirMensagemErro("nome-mae-error", "");
  exibirMensagemErro("nome-crianca-error", "");

  let formularioValido = true;

  if (!validarCPF(cpf)) {
    exibirMensagemErro("cpf-error", "CPF inválido");
    formularioValido = false;
  }

  if (!nomeMae) {
    exibirMensagemErro("nome-mae-error", "Nome da mãe é obrigatório");
    formularioValido = false;
  }

  if (!nomeCrianca) {
    exibirMensagemErro("nome-crianca-error", "Nome da criança é obrigatório");
    formularioValido = false;
  }

  if (formularioValido) {
    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, nomeMae, nomeCrianca }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Cadastro concluído! Você será redirecionado à página de login.");
        setTimeout(() => (window.location.href = "index.html"), 3000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Erro ao enviar os dados. Tente novamente mais tarde.");
    }
  }
}

// Função para enviar dados do formulário de login
async function enviarDadosLogin(event) {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value.trim();
  exibirMensagemErro("cpf-error", "");

  if (!validarCPF(cpf)) {
    exibirMensagemErro("cpf-error", "CPF inválido");
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Login bem-sucedido! Você será redirecionado para o painel.");
      setTimeout(() => (window.location.href = "registro.html"), 3000);
    } else {
      exibirMensagemErro("cpf-error", result.message);
    }
  } catch (error) {
    alert("Erro ao enviar os dados. Tente novamente mais tarde.");
  }
}

document
  .getElementById("cadastro-form")
  .addEventListener("submit", enviarDadosCadastro);
document
  .getElementById("login-form")
  .addEventListener("submit", enviarDadosLogin);
