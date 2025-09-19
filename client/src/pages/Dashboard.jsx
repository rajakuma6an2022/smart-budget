import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/common/Card";
import { useGetUserByIdQuery } from "../redux/api-services/userApi";
import { useSelector } from "react-redux";
import { useGetIncomesQuery } from "../redux/api-services/incomeApi";
import { useGetExpensesQuery } from "../redux/api-services/expenseApi";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useSelector((st) => st.auth);
  const username = user?.name;

  const { data: incomes, isLoading: incomesLoading } = useGetIncomesQuery();
  const { data: expenses, isLoading: expensesLoading } = useGetExpensesQuery();

  // Helper: group by category
  const groupByCategory = (data = []) => {
    const result = {};
    data.forEach((item) => {
      if (!result[item.category]) {
        result[item.category] = 0;
      }
      result[item.category] += item.amount;
    });
    return Object.entries(result).map(([name, value]) => ({ name, value }));
  };

  const incomeData = groupByCategory(incomes?.data);
  const expenseData = groupByCategory(expenses?.data);

  const totalIncome = incomeData?.reduce((sum, i) => sum + i.value, 0) || 0;
  const totalExpense = expenseData?.reduce((sum, i) => sum + i.value, 0) || 0;

  const recentExpenses = expenses?.data
    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
    ?.slice(0, 5);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="lg:p-3 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg lg:text-2xl font-bold">Welcome, {username}</h1>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-green-100">
            <CardContent>
              <h2 className="text-base lg:text-lg text-black font-semibold">
                Total Income
              </h2>
              <p className="text-lg lg:text-2xl font-bold text-green-700">
                ${totalIncome}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-red-100">
            <CardContent>
              <h2 className="text-base lg:text-lg text-black font-semibold">
                Total Expense
              </h2>
              <p className="text-lg lg:text-2xl font-bold text-red-700">
                ${totalExpense}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Donut */}
        <Card>
          <CardContent>
            <h2 className="text-base lg:text-lg font-semibold mb-4">
              Income Breakdown
            </h2>
            {incomeData?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={incomeData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                    >
                      {incomeData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <ul className="flex flex-wrap gap-4 justify-center mt-4 text-xs lg:text-sm">
                  {incomeData.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                      {item.name} - {item.value}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-base lg:text-lg text-gray-500">
                No income data
              </p>
            )}
          </CardContent>
        </Card>

        {/* Expense Donut */}
        <Card>
          <CardContent>
            <h2 className="text-base lg:text-lg font-semibold mb-4">
              Expense Breakdown
            </h2>
            {expenseData?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                    >
                      {expenseData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <ul className="flex flex-wrap gap-4 justify-center mt-4 text-xs lg:text-sm">
                  {expenseData.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                      {item.name} - {item.value}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-base lg:text-lg text-gray-500">
                No expense data
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-base lg:text-lg font-semibold mb-4">
              Recent Expenses
            </h2>
            {recentExpenses?.length > 0 ? (
              <ul className="space-y-2">
                {recentExpenses.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex justify-between text-sm lg:text-base items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
                  >
                    <span>{item.notes || item.category}</span>
                    <span className="font-bold text-red-600">
                      -${item.amount}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-base lg:text-lg text-gray-500">
                No recent expenses
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
