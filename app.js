const express = require('express');
const cors = require('cors');
const todoRoutes = require('./route/TodoRoute');
const ConnectDB = require('./config/db');

ConnectDB();

const app = express();

const corsOp = {
    origin: ['https://gftech-todo.vercel.app', 'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}
app.use(cors(corsOp));
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello are you readly to use the to do app?')
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
