import { Formik } from "formik";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Should be greater than 3")
    .max(20, "Should be of max 20 ")
    .required("Required"),
});

const App = () => {
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generate = (passwordLength) => {
    passwordLength = parseInt(passwordLength);
    let chars = "";
    if (includeLowercase) {
      chars += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeUppercase) {
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeNumbers) {
      chars += "0123456789";
    }
    if (includeSymbols) {
      chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}> Typical Password Generator !</Text>
      </View>
      <Formik
        initialValues={{ passwordLength: "7" }}
        validationSchema={passwordSchema}
        onSubmit={(values) => {
          const length = parseInt(values.passwordLength, 10);
          const pwd = generate(length);
          alert(`Generated Password: ${pwd}`);
        }}
      >
        {({ handleChange, values, errors, isValid, touched, handleSubmit }) => (
          <View style={styles.inputContainer}>
            <View>
            {errors.passwordLength && touched.passwordLength && (
              <Text style={{ fontSize: 12, color: "#ffa1a3ff" }}>
                {errors.passwordLength}
              </Text>
            )}
            </View>

            <TextInput
              placeholder="Length"
              onChangeText={handleChange("passwordLength")}
              style={styles.inputBar}
              value={values.passwordLength}
              keyboardType="numeric"
            ></TextInput>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text style={[styles.texts, { color: "#D7C0D0" }]}>
                  {" "}
                  Include lowercase ?
                </Text>
                <BouncyCheckbox
                  isChecked={includeLowercase}
                  onPress={() => setIncludeLowercase(!includeLowercase)}
                  fillColor="#D7C0D0"
                  style={{ marginLeft: 20 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text style={[styles.texts, { color: "#F7C7DB" }]}>
                  {" "}
                  Include UPPERCASE ?
                </Text>
                <BouncyCheckbox
                  isChecked={includeUppercase}
                  onPress={() => setIncludeUppercase(!includeUppercase)}
                  fillColor="#F7C7DB"
                  style={{ marginLeft: 20 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text Text style={[styles.texts, { color: "#C86FC9" }]}>
                  {" "}
                  Include Numb3rs ?
                </Text>
                <BouncyCheckbox
                  isChecked={includeNumbers}
                  onPress={() => setIncludeNumbers(!includeNumbers)}
                  fillColor="#C86FC9"
                  style={{ marginLeft: 20 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text style={[styles.texts, { color: "#ca4eccff" }]}>
                  {" "}
                  Include &apos;symbols&apos; ?
                </Text>
                <BouncyCheckbox
                  isChecked={includeSymbols}
                  onPress={() => setIncludeSymbols(!includeSymbols)}
                  fillColor="#ca4eccff"
                  style={{ marginLeft: 20 }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#F79AD3",
                padding: 20,
                borderRadius: 10,
                marginTop: 50,
              }}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles.texts,
                  {
                    marginLeft: 0,
                    textAlign: "center",
                    color: "#5a3359ff",
                    fontFamily: "monospace",
                  },
                ]}
              >
                Generate Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5a3359ff",
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "tahoma",
    marginTop: 50,
    color: "#F79AD3",
  },
  texts: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "tahoma",
    marginLeft: 50,
  },
  inputBar: {
    borderWidth: 2,
    borderColor: "#F79AD3",
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    fontSize: 20,
    color: "white",
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});

export default App;
