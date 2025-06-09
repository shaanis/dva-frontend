import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import moment from 'moment';
import { getAllProductsApi } from '../../services/allApi';

const SummaryCard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProductsApi();
        const products = res?.data || [];

        const grouped = {};
        products.forEach(p => {
          const month = moment(p.createdAt).format('MMM');
          grouped[month] = (grouped[month] || 0) + 1;
        });

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const finalData = months.map(month => ({
          month,
          products: grouped[month] || 0
        }));

        setChartData(finalData);
      } catch (error) {
        console.error('Failed to load product data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg flex items-center justify-between gap-6">
      {/* Text Summary */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold text-white">Products</h2>
        <p className="text-gray-400">Manage your product catalog</p>
        <h3 className="text-3xl font-bold mt-4 text-yellow-400">
          {chartData.reduce((acc, cur) => acc + cur.products, 0)}
        </h3>
        <p className="text-sm text-gray-400">Total Products</p>
      </div>

      {/* Line Chart */}
      <div className="w-full md:w-[60%] h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="month" stroke="#a3a3a3" />
            <YAxis stroke="#a3a3a3" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
              labelStyle={{ color: "#facc15" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="products"
              stroke="#facc15"
              strokeWidth={2.5}
              dot={{ fill: "#facc15", r: 5 }}
              activeDot={{ r: 8 }}
              fillOpacity={1}
              fill="url(#colorProducts)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SummaryCard;
