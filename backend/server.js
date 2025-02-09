import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const user = []

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

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na Porta ${PORT}`);
});
