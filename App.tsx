import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = yup.object().shape({
  passwordlength: yup
    .number()
    .typeError('Please enter a valid number')
    .min(6, 'Should be at least 6')
    .max(100, 'Should be at most 100')
    .required('Password length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const generatePassword = (
    passwordLength: number,
    includeLowercase: boolean,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
  ) => {
    let characterList = '';

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-={}[]|:;"<>,.?/~`';

    if (includeLowercase) {
      characterList += lowercaseChars;
    }

    if (includeUppercase) {
      characterList += uppercaseChars;
    }

    if (includeNumbers) {
      characterList += numberChars;
    }

    if (includeSymbols) {
      characterList += symbolChars;
    }

    if (characterList.length === 0) {
      return;
    }

    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(
        Math.random() * characterList.length,
      );

      result += characterList[randomIndex];
    }

    setPassword(result);
    setIsPasswordGenerated(true);
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Password Generator
        </Text>

        <Text style={styles.subtitle}>
          Create a strong password with ease
        </Text>

        <Formik
          initialValues={{
            passwordlength: '',
            includeLowercase: true,
            includeUppercase: false,
            includeNumbers: false,
            includeSymbols: false,
          }}
          validationSchema={passwordSchema}
          onSubmit={values => {
            generatePassword(
              Number(values.passwordlength),
              values.includeLowercase,
              values.includeUppercase,
              values.includeNumbers,
              values.includeSymbols,
            );
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
            isValid,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>
                    Password Length
                  </Text>

                  {errors.passwordlength &&
                    touched.passwordlength && (
                      <Text style={styles.errorText}>
                        {errors.passwordlength}
                      </Text>
                    )}
                </View>

                <TextInput
                  style={styles.input}
                  value={values.passwordlength}
                  onChangeText={handleChange(
                    'passwordlength',
                  )}
                  onBlur={handleBlur('passwordlength')}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Include Lowercase
                </Text>

                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.includeLowercase}
                  onPress={() =>
                    setFieldValue(
                      'includeLowercase',
                      !values.includeLowercase,
                    )
                  }
                  fillColor="#29AB87"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Include Uppercase
                </Text>

                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.includeUppercase}
                  onPress={() =>
                    setFieldValue(
                      'includeUppercase',
                      !values.includeUppercase,
                    )
                  }
                  fillColor="#FFC107"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Include Numbers
                </Text>

                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.includeNumbers}
                  onPress={() =>
                    setFieldValue(
                      'includeNumbers',
                      !values.includeNumbers,
                    )
                  }
                  fillColor="#9C27B0"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Include Symbols
                </Text>

                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.includeSymbols}
                  onPress={() =>
                    setFieldValue(
                      'includeSymbols',
                      !values.includeSymbols,
                    )
                  }
                  fillColor="#FF5722"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.generateButton,
                  ]}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>
                    Generate Password
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.resetButton,
                  ]}
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}>
                  <Text style={styles.buttonText}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        {isPasswordGenerated && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              Generated Password
            </Text>

            <Text style={styles.passwordText}>
              {password}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
  },

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  inputColumn: {
    flex: 1,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 90,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },

  buttonContainer: {
    marginTop: 20,
  },

  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  generateButton: {
    backgroundColor: '#4CAF50',
  },

  resetButton: {
    backgroundColor: '#E53935',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  resultContainer: {
    marginTop: 30,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  passwordText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});