import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function AdminPage() {
  const [sweets, setSweets] = useState([]);

  const navigate = useNavigate();

  const [addForm, setAddForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editForm, setEditForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [search, setSearch] = useState('');
 
  

  useEffect(() => {

    fetchSweets();

  }, []);

  const fetchSweets = () => {

    fetch('http://localhost:5000/itempage')
      .then((res) => res.json())
      .then((data) => setSweets(data));

  };

  const adding = (e) => {
    setAddForm({ ...addForm,
       [e.target.name]: e.target.value });
  };

  const addItems = (e) => {
    e.preventDefault();

    console.log('Submitting:', addForm);
    fetch('http://localhost:5000/sweets', {


      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        name: addForm.name,
        category: addForm.category,
        price: Number(addForm.price),
        quantity: Number(addForm.quantity)
      })
    })

      .then(res => res.json())

      .then(() => {
        fetchSweets(); 
        setAddForm({ name: '',
                     category: '',
                      price: '',
                     quantity: '' 
                    });
        setShowAddForm(false);
      });
  };

  const startEdit = (sweet) => {

    setEditId(sweet.id);

    setEditForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity
    });
  };

  const changeItems = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const Editing = (e) => {

    e.preventDefault();


    fetch(`http://localhost:5000/sweets/${editId}`, {

      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)

    })

      .then(res => res.json())
      .then(() => {
        fetchSweets();
        setEditId(null);
        setEditForm({ name: '',
           category: '',
            price: '',
             quantity: ''
             });
      });
  };

  

  const logout = () => {
    navigate('/');
  };

  const handleDelete = (id) => {

    fetch(`http://localhost:5000/sweets/${id}`, {

      method: 'DELETE'

    })
      .then(res => res.json())
      .then(() => {
        toast.success('Sweet deleted');
        fetchSweets(); 
      });
  };

 

  return (
    <div id="admin-page">
      <div id="header">
        <h2>There is all items are available</h2>
       
          <form onSubmit={addItems} style={{ margin: '16px 0', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          
            <input type='text'  name='name'  placeholder='Name'  value={addForm.name}
              onChange={adding}
              style={{ minWidth: 100 }}
            />


            <input type='text'  name='category'  
                placeholder='Category' value={addForm.category}
              onChange={adding}
              style={{ minWidth: 100 }}
            />

            <input type='number'   name='price'   placeholder='Price' value={addForm.price} 
               onChange={adding}
              style={{ minWidth: 80 }}
            />
            <input  type='number' name='quantity' placeholder='Quantity' value={addForm.quantity}
              onChange={adding}
              style={{ minWidth: 80 }}
            />
            <button className="btn btn-success" type='submit'>Add</button>
          </form>
        
        
        <button className="btn btn-danger" onClick={logout}>
          logout
        </button>
        <br />
       
        <input
          placeholder="search items"
          className="form-control"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        
        <br />
      </div>
      <div>
        {sweets
          .filter(sweet => sweet.name.toLowerCase().includes(search.toLowerCase()))
          .map((sweet) => (
          <ul className="list-group list-group-flush" key={sweet.id}>
            <div>
              <li className="list-group-item">
               
               
                  
                    {editId === sweet.id ? (
                      <form onSubmit={Editing}>
                        <input name="name" value={editForm.name} onChange={changeItems} />
                        <input name="category" value={editForm.category} onChange={changeItems} />
                        <input name="price" value={editForm.price} onChange={changeItems} type="number" />
                        <input name="quantity" value={editForm.quantity} onChange={changeItems} type="number" />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                      </form>
                    ) : (


                      <>
                        <h2>{sweet.name}</h2>
                        <p>category - {sweet.category}</p>
                        <p>price - ₹{sweet.price}</p>
                        <p>quantity - {sweet.quantity}</p>
                        <button className="btn btn-success" onClick={() => startEdit(sweet)}>
                          Edit
                        </button>
                        <button className='btn btn-danger' onClick={() => handleDelete(sweet.id)}>
                      Delete
                    </button>

                      </>
                    )}

                 

                    <br />
                  
              </li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}
