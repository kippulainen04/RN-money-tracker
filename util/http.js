import axios from 'axios';

export function storeExpense(expenseData) {
    axios.post('https://react-native-3ecd5-default-rtdb.firebaseio.com/expenses.json',
    expenseData
    );
}

