import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

let WizardFormSecondPage = (props) => {
  const { keepsubject, handleSubmit, previousPage, dispatch, change } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="subject.label"
        type="text"
        component={renderField}
        label="Add or edit Subject"
      />
      <div>
        <button
          type="button"
          className="previous"
          onClick={function (event) {
            if (keepsubject === "undefined") {
              dispatch(change("subject", ""));
            }
            previousPage();
          }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={function (event) {
            dispatch(change("subject", ""));
            dispatch(change("keepSubject", ""));
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="next"
          onClick={function (event) {
            dispatch(change("keepSubject", "1"));
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

let selector = formValueSelector("wizard");
WizardFormSecondPage = connect((state) => {
  const firstName = selector(state, "keepSubject");
  return { keepsubject: `${firstName}` };
})(WizardFormSecondPage);

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);
