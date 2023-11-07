//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/bookhaven", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const produtolivraria = new mongoose.Schema({
  id_produtolivraria: { type: String, required: true },
  descricao: { type: String },
  editora: { type: String },
  dataimpressao: { type: Date },
  quantidadeestoque: { type: Number },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtolivraria = mongoose.model("Produtolivraria", produtolivraria);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroprodutolivraria", async (req, res) => {
  const id_produtolivraria = req.body.id_produtolivraria;
  const descricao = req.body.descricao;
  const editora = req.body.editora;
  const dataimpressao = req.body.dataimpressao;
  const quantidadeestoque = req.body.quantidadeEstoque;

  //mandando para banco
  const produtolivraria = new produtolivraria({
    id_produtolivraria: id_produtolivraria,
    descricao: descricao,
    editora: editora,
    dataimpressao: dataimpressao,
    quantidadeEstoque: quantidadeEstoque,
  });
  try {
    const newprodutolivraria = await produtolivraria.save();
    res.json({
      error: null,
      msg: "Cadastro ok",
      produtolivrariaId: newprodutolivraria._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//rota de get de formulario
app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
