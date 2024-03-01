const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Conexão com o MongoDB Atlas
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin@cluster0.hp7smvp.mongodb.net/insanity?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Defina um modelo simples (substitua conforme necessário)
const ItemSchema = new mongoose.Schema({
  nome: String,
});

const Item = mongoose.model("itens", ItemSchema);

// Rota para obter todos os itens
app.get("/itens", async (req, res) => {
  try {
    const itens = await Item.find();
    res.json(itens);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para adicionar um novo item
app.post("/adicionarItem", async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "Nome do item é obrigatório." });
  }

  try {
    const newItem = new Item({ nome });
    await newItem.save();
    res.status(201).json({ mensagem: "Item adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar item:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
