import express from 'express';
import cors from 'cors';
import employeesRoutes from './src/routes/employees.routes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor finconectado y funcionando correctamente');
});

app.use('/employees', employeesRoutes);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
