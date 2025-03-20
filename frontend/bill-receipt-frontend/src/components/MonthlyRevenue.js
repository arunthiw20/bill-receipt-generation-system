import React, { useEffect, useState } from 'react';
import api from '../api/api.js';

const MonthlyRevenueSummary = ({ month, year }) => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueSummary = async () => {
      setRevenueData([]);

      try {
        const response = await api.get(`/revenue/monthly-summary/${year}/${month}`);
        console.log('fetchRevenueSummary Revenue Data:', response.data);
        setRevenueData(response.data);
      } catch (error) {
        console.error("Error fetching monthly revenue summary", error);
      }
    };

    fetchRevenueSummary();
  }, [month, year]);

  return (
    <div><br />
      <h4>Monthly Sales</h4>
      <table className='mx-auto table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(revenueData) && revenueData.length > 0 ? (
            revenueData.map((item) => (
              <tr key={item.purchase_date}>
                <td>{item.customer_name}</td>
                <td>{item.total_amount}</td>
                <td>{item.purchase_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No revenue data available for now</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyRevenueSummary;
