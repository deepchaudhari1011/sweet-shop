import React, { useState, useEffect } from 'react';
import './itempage.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Itempage() {
  const [sweets, setSweets] = useState([]);
  const [quntity, setQuntity] = useState({});
  const navigate = useNavigate();
  

  useEffect(() => {

    fetchSweets();

  }, []);

  const fetchSweets = () => {

    fetch('http://localhost:5000/itempage')

      .then((res) => res.json())

      .then((data) => setSweets(data));
  };

  const logout = () => {
    navigate('/');
  };


  const ordered = (id) => {
    const sweet = sweets.find(s => s.id === id);
    const qty = quntity[id];

    if (!qty || qty === '') {
      toast.error('Quantity is empty');
      return;
    }

    if (Number(qty) > sweet.quantity) {
      toast.error(`Only ${sweet.quantity} are available`);
      return;
    }

    toast.success('Ordered successfully');
    
    
    fetch(`http://localhost:5000/sweets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: sweet.quantity - Number(qty) })

    })

      .then(res => res.json())
      .then(() => {
        fetchSweets();
        setQuntity((prev) => ({ ...prev, [id]: '' }));

      });

  };

  return (
    <div id='itempage'>
      <div id='header'>
        <center>
          <h1>Deep Sweet Shop</h1>
        </center>
      </div>
      <hr />
      <center>
        
        <div id='container'>
          {sweets
            .map((sweet) => (
              <div id='item-card' key={sweet.id}>
                <h2>{sweet.name}</h2>
                <hr />
                category - {sweet.category}
                <br />
                price - ₹{sweet.price}
                <br />
                quantity - {sweet.quantity}
                <br />
                <input
                  className='sweet-input'
                  type='number'
                  placeholder='how much you want'
                  value={quntity[sweet.id] || ''}
                  onChange={(e) => setQuntity({ ...quntity, [sweet.id]: e.target.value })}
                />
                <button onClick={() => ordered(sweet.id)}> buy item</button>
              </div>
            ))}
        </div>
      </center>
      <div>
        
      
      </div>
    </div>
  )};
              