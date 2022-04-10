import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { HealthRatingOption, SelectField, TextField } from "./FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 0 },
  { value: HealthCheckRating.LowRisk, label: 1 },
  { value: HealthCheckRating.HighRisk, label: 2 },
  { value: HealthCheckRating.CriticalRisk, label: 3 }
];

const isValidDescription = (d: string): boolean => {
  if (d.length < 2) {
    return false;
  } else {
    return true;
  }
};

const isValidDate = (d: string): boolean => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(d);
};

const isValidSpecialist = (s: string): boolean => {
  if (s.slice(0, 3) === 'MD ' || s.slice(0, 3) === 'Dr ') {
    return true;
  }
  return false;
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const formatError = "Incorrectly formatted";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!isValidDescription(values.description)) {
          errors.description = formatError;
        }
        if (!isValidDate(values.date)) {
          errors.date = formatError;
        }
        if (!isValidSpecialist(values.specialist)) {
          errors.specialist = formatError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField
              label="Health check rating"
              name="healthCheckRating"
              options={healthRatingOptions}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
