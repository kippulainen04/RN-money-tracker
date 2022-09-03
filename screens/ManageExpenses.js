import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

const ManageExpenses = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expenseCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId; // into a Boolean

  const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [isEditing, navigation]); 

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editExpenseId);
      expenseCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('COuld not delete expense - please try again later!')
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if(isEditing) {
        expenseCtx.updateExpense(
          editExpenseId, expenseData);
          await updateExpense(editExpenseId,expenseData); 
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - Please try again later!');
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if(isSubmitting) {
    return <LoadingOverlay />;
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