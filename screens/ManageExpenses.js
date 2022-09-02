import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpenses = ({route, navigation}) => {
  const expenseCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId; // into a Boolean

  const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [isEditing, navigation]); 

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if(isEditing) {
      expenseCtx.updateExpense(
        editExpenseId, expenseData) 
    } else {
      expenseCtx.addExpense(expenseData)
    }
    navigation.goBack();

  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
      onCancel={cancelHandler} 
      submitButtonLabel={isEditing ? 'Update': 'Add'} 
      onSubmit={confirmHandler}
      defaultValues={selectedExpense}
      />
      {isEditing && 
      <View style={styles.deleteContainer}>
        <IconButton 
          icon='trash' 
          color={GlobalStyles.colors.error500} 
          size={24}
          onPress={deleteExpenseHandler}
          />
      </View>
      }
    </View>

  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})