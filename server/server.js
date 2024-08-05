const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do SQL Server
const dbConfig = {
  user: "your_username",
  password: "your_password",
  server: "your_server",
  database: "your_database",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "..")));

app.post("/api/cadastro", async (req, res) => {
  const { cpf, nomeMae, nomeCrianca } = req.body;

  try {
    const hashedCPF = await bcrypt.hash(cpf, 10);

    await sql.connect(dbConfig);

    const result = await sql.query`
      INSERT INTO Users (CPF, NomeMae, NomeCrianca)
      VALUES (${hashedCPF}, ${nomeMae}, ${nomeCrianca})
    `;

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao cadastrar usuário" });
  }
});

app.post("/api/login", async (req, res) => {
  const { cpf } = req.body;

  try {
    await sql.connect(dbConfig);

    const result = await sql.query`
      SELECT CPF FROM Users
    `;

    if (result.recordset.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    const user = result.recordset[0];
    const isValid = await bcrypt.compare(cpf, user.CPF);

    if (!isValid) {
      return res.status(401).json({ success: false, message: "CPF inválido" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro ao fazer login" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
