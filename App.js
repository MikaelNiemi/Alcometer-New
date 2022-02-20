import {StyleSheet, Text, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { ScrollView } from 'react-native';


export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState('male');
  const [alcohol, setAlcohol] = useState(0);

  const bottleamount=Array();
  bottleamount.push({label: '1 bottle',value: 1});
  bottleamount.push({label: '2 bottles',value: 2});
  bottleamount.push({label: '3 bottles',value: 3});
  bottleamount.push({label: '4 bottles',value: 4});
  bottleamount.push({label: '5 bottles',value: 5});

  const hours=Array();
  hours.push({label: '1 hour',value: 1});
  hours.push({label: '2 hours',value: 2});
  hours.push({label: '3 hours',value: 3});
  hours.push({label: '4 hours',value: 4});
  hours.push({label: '5 hours',value: 5});

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  function calculate() {
    let result = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsleft = grams - burning * time;

    if (gender === 'male') {
      result = gramsleft / (weight * 0.7);
    } else {
      result = gramsleft / (weight * 0.6);
    }
    setAlcohol(result);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}><h1>Alcometer</h1></Text>
      <View style={styles.field}>
        <Text><h3>Weight</h3></Text>
        <TextInput
        style={styles.input}
        onChangeText={text => setWeight(text)}
        placeholder='in kilograms'
        keyboardType='numeric'>
        </TextInput>
      </View>
      <View style={styles.field}>
        <Text><h3>Bottles</h3></Text>
        <Picker style={styles.bottles}
        onValueChange={(itemValue) => setBottles(itemValue)}
        selectedValue={bottles}>
          {bottleamount.map((bottles,index) => (
            <Picker.Item key={index} label={bottles.label} value={bottles.value}/>
          ))}
        </Picker>
      </View>
      <View style={styles.field}>
        <Text><h3>Time</h3></Text>
        <Picker style={styles.time}
        onValueChange={(itemValue) => setTime(itemValue)}
        selectedValue={time}>
          {hours.map((time,index) => (
            <Picker.Item key={index} label={time.label} value={time.value}/>
          ))}
        </Picker>
      </View>
      <View style={styles.field}>
        <Text><h3>Gender</h3></Text>
        <RadioForm
          style={styles.radio}
          buttonSize = {10}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />
      <Text style={styles.answer}>{alcohol.toFixed(2)}</Text>
      </View>
      <Button onPress={calculate} title="Calculate"></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
  },
  h1: {
    alignSelf: "center",
    color: "dodgerblue",
  },
  answer: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  }
});