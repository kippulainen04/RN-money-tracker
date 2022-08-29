import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpenses = ({route, navigation}) => {
  const expenseCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId; // into a Boolean

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
  function confirmHandler() {
    if(isEditing) {
      expenseCtx.updateExpense(
        editExpenseId,
        {
        description: 'A tomato',
        amount: 1.90,
        date: new Date('2022-08-25')
      }) 
    } else {
      expenseCtx.addExpense({
        description: 'An egg',
        amount: 0.90,
        date: new Date('2022-08-23'),
      })
    }
    navigation.goBack();

  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode='flat' style={styles.button} onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})