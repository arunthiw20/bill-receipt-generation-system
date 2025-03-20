// /src/components/LastBills.js
import React, { useState, useEffect } from 'react';
import api from '../api/api.js'; // assuming you're using the api instance for backend calls

const LastBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchLastBills = async () => {
      try {
        const response = await api.get('/bills/last');
        setBills(response.data);
        console.log("response.data.user in profile js:", response.data);
      } catch (error) {
        console.error('Error fetching last 10 bills', error);
      }
    };

    fetchLastBills();
  }, []);

  return (
    <div>
      <h3>Last 10 Bills</h3>
      {bills.length > 0 ? (
        <table className='mx-auto table table-bordered'>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.customer_name}</td>
                <td>{bill.total_amount}</td>
                <td>{bill.purchase_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bills found.</p>
      )}
    </div>
  );
};

export default LastBills;
