const express = require("express"); // Importa o express
const app = express(); //instancia o express
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const { PrismaClient } = require("@prisma/client"); //DIFERENTE
const prisma = new PrismaClient(); //DIFERENTE

const cors = require("cors"); //DIFERENTE
app.use(cors()); // DIFERENTE (Libera o acesso do frontend, VAMOS VER MAIS NA FRENTE)

const PORT = 3001; //Aqui eu defino a porta
app.use(express.json()); // Permite que a API receba JSON


// Rota para listar todos os gastos
app.get("/gastos", async (req, res) => {
  try {
    const gastos = await prisma.gasto.findMany();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gastos" });
  }
});

// Rota para buscar um gasto por ID
app.get("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await prisma.gasto.findUnique({ where: { id } });

    if (!gasto) {
      return res.status(404).json({ error: "Gasto não encontrado" });
    }

    res.json(gasto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gasto" });
  }
});

// Rota para adicionar um novo gasto
app.post("/gastos", async (req, res) => {
  try {
    const { usuario, descricao, valor, categoria, data } = req.body;
    const novoGasto = await prisma.gasto.create({
      data: { usuario, descricao, valor: parseFloat(valor), categoria, data: new Date(data) },
    });
    console.log(novoGasto)
    return res.status(201).json(novoGasto);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao adicionar gasto" });
  }
});

// Rota para excluir um gasto por ID
app.delete("/gastos/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const gastoExiste = await prisma.gasto.findUnique({ where: { id } });
  
      if (!gastoExiste) {
        return res.status(404).json({ error: "Gasto não encontrado" });
      }
  
      await prisma.gasto.delete({ where: { id } });
  
      res.json({ message: "Gasto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir gasto" });
    }
  });
// Configuração para usuários

// Recuperar todos usuários -> Funciona
app.get('/usuarios', async (req, res)=>{
  try{
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  }catch(error){
    res.status(500).json(error)
  }
})
// Listar usuário específico
// app.get('/usuarios/:id', async (req,res)=>{
//   try{
//     const {id} = req.params;
//     const usuario = await prisma.usuario.findUnique({where:{id}})
//     if(!usuario){
//       return res.status(404).json('Usuário não encontrado')
//     }
//     res.json(usuario)
//   }catch(error){
//     res.status(500).json(error)
//   }
// })
// Registrar usuário -> Está funcionando
app.post('/usuarios', async (req,res) => {
  try{
    const {nome, senha} = req.body;
    const usuario_existente = await prisma.usuario.findUnique({where:{nome}})
    // console.log(usuario_existente)
    if(usuario_existente){
      return res.status(400).json({error:'Usuário já existente'})
    }
    else{
      const hashSenha = await bcrypt.hash(senha,10)
      console.log(hashSenha)
      const novo_usuario = await prisma.usuario.create({
      data: {nome, senha: hashSenha}
      })
      return res.json('Usuário registrado com sucesso')
    }
    }catch(error){
    return res.status(500).json('Erro ao registar usuário')
    }
    
})
// Deletar usuário -> Está funcionando
app.delete('/usuarios', async (req,res) =>{
  try{
    const {nome} = req.body;
    console.log(nome)
    const usuario_deletado = await prisma.usuario.findUnique({where:{nome}})
    if(!usuario_deletado){
      return res.status(404).json('Usuário não contrado')
    }else{
      await prisma.usuario.delete({where:{nome}})
      return res.json('Usuário removido com sucesso')
    }

  }catch(err){
    return res.status(500).json(err)
  }
})
//Login --> Com problemas
app.post('/login', async (req,res) =>{
  try{
    const {nome, senha} = req.body;
    const usuario_bd = await prisma.usuario.findUnique({where:{nome}})
    if(usuario_bd == null){
      return res.status(404).json('Usuário não encontrado')
    }else{
      const senha_valida = await bcrypt.compare(senha, usuario_bd.senha);
      if(!senha_valida){
        return res.status(400).json('Senha inválida')
      }
      else{
        // console.log("AAAAAAAAAAAAAAAAAAAAA") -> Estava tendo problemas aqui
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign(
          {nome: usuario_bd.nome }, process.env.JWT_SECRET,{expiresIn:'1h'}
        )
        // console.log("BBBBBBBBBBBBBBBBBBBBBBB")
        return res.json({
          token, 
          usuario: {
            nome: usuario_bd.nome
          }
        });
      }
    }
  }catch(err){
    return res.json({'erro':err})
  }
})

// Middleware de autenticação

const autenticarToken = (req,res,next) =>{
  const authHeader = req.headers['authorization']
  const toke = authHeader && authHeader.split(' '[1])
  if(token == null){
    return res.sendStatus(401);
  } 
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403)
    req.nome = user;
    next()
  })
}


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});