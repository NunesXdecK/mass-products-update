import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { Connection } from 'mysql';
import cors, { CorsOptions } from 'cors';

interface UpdateData {
  id: string,
  value: string
}

const app = express();
const port = 4000;

const dbConfig = {
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database'
};

const connection: Connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados.');
  }
});

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000', // Coloque a origem permitida do seu aplicativo React
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/products', (req: Request, res: Response) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os produtos do banco de dados.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/packs', (req: Request, res: Response) => {
  connection.query('SELECT * FROM packs', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os produtos do banco de dados.' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/update-products', (req: Request, res: Response) => {
  const data = req.body;
  const SQL_START = "UPDATE products SET sales_price = CASE "
  let SQL_CENTER = ""
  data.forEach((p: UpdateData) => {
    SQL_CENTER = SQL_CENTER + 'WHEN code = ' + p.id + ' THEN ' + p.value + ' '
    //+ 'WHEN EXISTS (SELECT pack_id, qty FROM packs WHERE product_id = ' + p.id + ') AND pack_id = code THEN (' + p.value + ' * qty) '
    //+ 'WHEN EXISTS (SELECT qty FROM packs WHERE pack_id = ' + p.id + ' THEN ' + p.value + ' '
  })
  const SQL_END = "ELSE sales_price END;"
  const SQL = (SQL_START + SQL_CENTER + SQL_END)
  connection.query(SQL, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os produtos do banco de dados.' });
    }
  });
  res.send({ 'status': 'SUCCESS' });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
