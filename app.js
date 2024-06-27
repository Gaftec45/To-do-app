const express = require('express');
const cors = require('cors');
const todoRoutes = require('./route/TodoRoute');
const ConnectDB = require('./config/db');

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello are you readly to use the to do app?')
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
