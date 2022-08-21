const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }
  if (values.subject === null) {
    errors.subject.label = "Required";
  }
  if (!values.resourceType) {
    errors.resourceType = "Required";
  }
  if (!values.angeRage) {
    errors.angeRage = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
};

export default validate;
