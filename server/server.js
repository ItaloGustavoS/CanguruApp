const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
