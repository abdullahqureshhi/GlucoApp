const React = require('react');
const { useState } = require('react');
const { View, Text, StyleSheet, TextInput, Button, FlatList } = require('react-native');
const { Provider, Card } = require('react-native-paper');

function App() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Function to handle adding an expense
  const addExpense = () => {
    if (!expenseName || !amount || !category) return; // Validation
    const newExpense = {
      id: Math.random().toString(),
      name: expenseName,
      amount: parseFloat(amount),
      category: category,
      date: new Date(),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setAmount('');
    setCategory('');
  };

  // Function to calculate the total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.header}>Expense Tracker</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <Button title="Add Expense" onPress={addExpense} />
        </View>

        <View style={styles.expenseList}>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardText}>Amount: ${item.amount}</Text>
                  <Text style={styles.cardText}>Category: {item.category}</Text>
                  <Text style={styles.cardText}>Date: {item.date.toLocaleDateString()}</Text>
                </View>
              </Card>
            )}
          />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Expenses: ${calculateTotal().toFixed(2)}</Text>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  expenseList: {
    flex: 1,
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardText: {
    fontSize: 14,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
  },
});

// Export the component using CommonJS
module.exports = App;


// const express = require('express');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api', inventoryRoutes);

// module.exports = app;
