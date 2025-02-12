import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/senddata', async (req, res) => {
    await prisma.user.create({
      data:{
        email: req.body.email,
        name:  req.body.name,
        age:  req.body.age,
        weight:  req.body.weight,
        height:  req.body.height,
        bmi:  req.body.bmi
      }
})
  res.status(201).json(req.body)
})

app.get('/getdata', async (req, res) => {
  const user = await prisma.user.findMany()

  res.status(200).json(user)
})

app.put('/senddata/:id', async (req, res) => {
  await prisma.user.update({

    where:{
      id: req.params.id
    },

    data:{
      email: req.body.email,
      name:  req.body.name,
      age:  req.body.age,
      weight:  req.body.weight,
      height:  req.body.height,
      bmi:  req.body.bmi
    }
})

res.status(201).json(req.body)
})

app.delete('/senddata/:id', async (req, res) => {
    try {
      const userId = req.params.id;
    
    const deleteUser = await prisma.user.delete({
      where: {id: userId},
    });
    if(!deleteUser){
      return res.status(404).json({message: 'Usuário Não Encontrado'});
    }

    res.status(200).json({message: 'Usuário Deletado com Sucesso'});
  }

  catch (error){
    console.error(error);
    res.status(500).json({message: 'Erro ao Deletar o Usuário', error: error.message});
  } 
  })

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na Porta ${PORT}`);
});


