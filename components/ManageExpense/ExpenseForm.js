import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Input from "./Input"

const ExpenseForm = () => {
    const [inputValue, setInputValue] = useState({
        amount: '',
        date: '',
        description: ''
    });

    function inputChangedHanlder(inputIdentifier, enteredValue) {
        setInputValue((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        })
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
    }
})