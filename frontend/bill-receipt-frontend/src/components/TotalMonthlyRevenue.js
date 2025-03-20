import React, { useEffect, useState } from 'react';
import api from '../api/api';

const TotalMonthlyRevenue = ({ month, year }) => {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await api.get(`/revenue/monthly-revenue/${year}/${month}`);
        console.log('TotalMonthlyRevenue Data:', response.data);
        setTotalIncome(response.data.totalIncome);
      } catch (error) {
        console.error("Error fetching total monthly income", error);
      }
    };

    fetchTotalIncome();
  }, [month, year]);

  return (
    <div><br /><br />
      <h4>Total Monthly Revenue</h4>
      <p>
        Total Income for {month}/{year}:
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          ${totalIncome}
        </span>
      </p>
    </div>
  );
};

export default TotalMonthlyRevenue;
