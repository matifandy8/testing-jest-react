import './App.css';import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div className="App">
    <Formik
    initialValues={{ email: "", date: "" }}
    validate={values => {
      let errors = {};
      if (!values.date) {
        errors.date = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      return errors;
    }}
  >
    {({ isSubmitting, setFieldValue, values }) => (
      <Form>
        <label htmlFor="email">Email</label>
        <Field id="email" type="email" name="email" />
        <ErrorMessage data-testid="emailError" name="email" component="div" />
        <br />
        <DatePicker
          selected={values.date}
          onChange={event => {
            setFieldValue("date", event);
          }}
        />
        <ErrorMessage data-testid="dateError" name="date" component="div" />
        <br />
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
    </div>
  );
}

export default App;
