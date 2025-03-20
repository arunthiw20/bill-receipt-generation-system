import React, { useState } from "react";
import api from "../api/api.js";

const Billing = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  // Function to add an item to the list
  const addItem = () => {
    if (itemName && itemPrice && itemQuantity) {
      const newItem = {
        name: itemName,
        price: parseFloat(itemPrice),
        quantity: parseInt(itemQuantity),
        total: parseFloat(itemPrice) * parseInt(itemQuantity),
      };

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setTotalAmount(updatedItems.reduce((sum, item) => sum + item.total, 0));

      // Reset input fields
      setItemName("");
      setItemPrice("");
      setItemQuantity("");
    }
  };

  // Function to handle bill submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/bills/create", {
        customerName,
        contactDetails,
        items,
        discount,
        totalAmount: totalAmount - discount,
        purchaseDate: new Date().toISOString().split("T")[0],
      });

      alert("Bill created successfully!");
      console.log("Bill response:", response.data);

      // Reset form
      setCustomerName("");
      setContactDetails("");
      setItems([]);
      setDiscount(0);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error creating bill", error);
      alert("Failed to create bill");
    }
  };

  return (
    <div>
      <h3>Billing</h3>
      <form onSubmit={handleSubmit} className='mx-auto' id="billform">
        <label className="bill-lable">Customer Name:</label>
        <input className="bill-input" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

        <label className="bill-lable">Contact Details:</label>
        <input className="bill-input" type="text" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} required />

        <h4>Items</h4>
        <input className="bill-input" type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <input className="bill-input" type="number" placeholder="Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
        <input className="bill-input" type="number" placeholder="Quantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
        <button type="button" onClick={addItem}>Add Item</button>

        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price} = ${item.total}
            </li>
          ))}
        </ul>

        <label className="bill-lable">Discount:</label>
        <input className="bill-input" type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />

        <h4>Total: ${totalAmount - discount}</h4>

        <button type="submit">Create Bill</button>
      </form>
    </div>
  );
};

export default Billing;
