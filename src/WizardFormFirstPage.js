import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const subjects = [
  "Arabic language",
  "Islamic education",
  "History",
  "Mathematics",
  "IT",
  "Knowledge"
];
const restypes = [
  "ARTICLES",
  "DOCUMENTS",
  "PRESENTATION",
  "IMAGES",
  "URLS",
  "ANNOUNCEMENTS",
  "OTHER"
];
const ageranges = [
  "AGE_ALL",
  "AGE_04_06",
  "AGE_07_09",
  "AGE_10_12",
  "AGE_13_15",
  "AGE_16_18"
];

let renderColorSelector = ({
  input,
  subjectinject,
  meta: { touched, error }
}) => (
  <div>
    <select {...input}>
      <option>{subjectinject}</option>
      {subjects.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

let resourceTypeSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option>Choose a reource type</option>
      {restypes.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

let ageRangeSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option>Choose a age range type</option>
      {ageranges.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

let WizardFormFirstPage = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    previousPage,
    dispatch,
    change,
    subject
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Title" />
      <div>
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={function (event) {
            if (subject === "undefined") {
              dispatch(change("subject", ""));
            }
            if (subject !== "undefined") {
              dispatch(change("keepSubject", "1"));
            }
            previousPage();
          }}
        >
          + Add subject
        </button>
      </div>
      <div>
        <label>Subject</label>
        <Field name="subject.label" component={renderColorSelector} />
      </div>
      <div>
        <label>Description</label>
        <div>
          <Field
            name="description"
            component="textarea"
            placeholder="Description"
          />
        </div>
      </div>
      <div>
        <label>Resource Type</label>
        <Field name="resourceType" component={resourceTypeSelector} />
      </div>
      <div>
        <label>Age Range</label>
        <Field name="angeRage" component={ageRangeSelector} />
      </div>
      <div>
        <button
          type="submit"
          onClick={function (event) {
            dispatch(change("keepSubject", ""));
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

let selector = formValueSelector("wizard");
renderColorSelector = connect((state) => {
  const subjectval = selector(state, "subject.label");
  return { subjectinject: `${subjectval}` };
})(renderColorSelector, WizardFormFirstPage);

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
