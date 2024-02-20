const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Arreglo global para almacenar datos
const data = [
  {
    id: 1,
    nombre: "Josue",
    carrera: "cibernetica",
    semestre: 3
  },
  {
    id: 2,
    nombre: "Fernando",
    carrera: "Industrial",
    semestre: 3
  },
  {
    id: 3,
    nombre: "Raul",
    carrera: "automotriz",
    semestre: 4
  }
];

// Middleware morgan para el manejo de solicitudes
app.use(morgan('dev'));
app.use(express.json());

// Endpoint GET sin parámetros
app.get("/", (req, res) => {
  res.send('Hola Mundo');
});

// Endpoint GET para obtener todos los datos
app.get("/data/all", (req, res) => {
  res.status(200).json(data);
});

// Endpoint GET con parámetros
app.get("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(item => item.id === id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send("Dato no encontrado");
  }
});

// Endpoint GET con query
app.get("/data/search", (req, res) => {
  const nombre = req.query.nombre;
  if (nombre) {
    const result = data.filter(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
    res.status(200).json(result);
  } else {
    res.status(400).send("Falta el parámetro 'nombre' en la consulta");
  }
});

// Endpoint POST
app.post("/data", (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).send("Dato agregado correctamente.");
});

// Endpoint PUT
app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const index = data.findIndex(item => item.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    res.status(200).send(`Dato con ID ${id} actualizado correctamente.`);
  } else {
    res.status(404).send("Dato no encontrado");
  }
});

// Endpoint DELETE
app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = data.findIndex(item => item.id === id);

  if (index !== -1) {
    data.splice(index, 1);
    res.status(200).send(`Dato con ID ${id} eliminado correctamente.`);
  } else {
    res.status(404).send("Dato no encontrado");
  }
});

// Middleware para manejar OPTIONS en todos los endpoints
app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto: ", port);
});
