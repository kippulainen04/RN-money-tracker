import { TextInput, View } from "react-native"

const Input = ({ label, textInputCongig }) => {
  return (
    <View>
        <Text>{label}</Text>
        <TextInput {...textInputCongig} />
    </View>
  )
}

export default Input