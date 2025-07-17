const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// save all items
const sweets = [
  { id: 1, name: 'kaju katli', category: 'nut-based' ,  price: 50 , quantity: 20 },
   { id: 2, name: 'gajar halwa', category: 'vagetable-based' ,  price: 30 , quantity: 10 },
  { id: 3, name: 'gulab jamu', category: 'milk-based' ,  price: 10 , quantity: 30 },
  { id: 4, name: 'kaju katli', category: 'nut-based' ,  price: 50 , quantity: 20 },
   { id: 5, name: 'gajar halwa', category: 'vagetable-based' ,  price: 30 , quantity: 10 },
  { id: 6, name: 'gulab jamu', category: 'milk-based' ,  price: 10 , quantity: 30 },
   { id: 7, name: 'kaju katli', category: 'nut-based' ,  price: 50 , quantity: 20 },
  { id: 8, name: 'gajar halwa', category: 'vagetable-based' ,  price: 30 , quantity: 10 },
  { id: 9, name: 'gulab jamu', category: 'milk-based' ,  price: 10 , quantity: 30 },
];


app.use(cors());


// send items in fronted

app.get('/itempage', (req, res) => {
  res.json(sweets);
});


//  item add array using this code

app.post('/sweets', (req, res) => {

  const { name, category, price, quantity } = req.body;
  
  const id = sweets.length > 0 ? Math.max(...sweets.map(s => s.id)) + 1 : 1;

  const newitem = { id, name, category, price, quantity };
     sweets.push(newitem);
  console.log('Current sweets array:', sweets); 
      res.status(201).json(newitem);
});


// using this we can update items dtails
app.put('/sweets/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const { name, category, price, quantity } = req.body;
  const sweet = sweets.find(s => s.id === id);
  if (!sweet) {

      return res.json({ error: 'item is not availble' });
  }

  if (name !== undefined) sweet.name = name;
  if (category !== undefined) sweet.category = category;
  if (price !== undefined) sweet.price = price;
  if (quantity !== undefined) sweet.quantity = quantity;

       res.json(sweet);
});


// Delete a item in sweet arry

app.delete('/sweets/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const index = sweets.findIndex(s => s.id === id);

  if (index === -1) {
         return res.json({ error: 'this item is not availble' });
  }
    const deleted = sweets.splice(index, 1);
  res.json(deleted[0]);
});


app.listen(5000, () => console.log('Server is running'));
