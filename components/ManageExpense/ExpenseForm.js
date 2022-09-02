import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { getFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input"

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {
    const [inputValue, setInputValue] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangedHanlder(inputIdentifier, enteredValue) {
        setInputValue((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description
        };

        onSubmit(expenseData)
    }

  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input
            style={styles.rowInput}
            label='Amount' 
            textInputCongig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangedHanlder.bind(this, 'amount'), 
                // preconfigure a func for future execution by using bind()
                value: inputValue.amount
            }}
            />
            <Input
            style={styles.rowInput}
            label='Date'
            textInputCongig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangedHanlder.bind(this, 'date'), 
                value: inputValue.date
            }}
            />
        </View>
        <Input 
        label='Description'
        textInputCongig={{
            multiline: true,
            // autoCorrect: false
            // autoCapitalize: 'none'
            onChangeText: inputChangedHanlder.bind(this, 'description'), 
            value: inputValue.description
        }}
        />
        <View style={styles.buttons}>
            <Button mode='flat' style={styles.button} onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      minWidth: 120,
      marginHorizontal: 8
    }
})