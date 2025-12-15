import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor finconectado y funcionando correctamente');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
