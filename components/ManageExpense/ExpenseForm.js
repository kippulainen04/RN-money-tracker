import { StyleSheet, Text, View } from "react-native"
import Input from "./Input"

const ExpenseForm = () => {
    function amountChangedHanlder() {

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
                onChangeText: amountChangedHanlder,
            }}
            />
            <Input
            style={styles.rowInput}
            label='Date'
            textInputCongig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: () => {}
            }}
            />
        </View>
        <Input 
        label='Description'
        textInputCongig={{
            multiline: true,
            // autoCorrect: false
            // autoCapitalize: 'none'
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