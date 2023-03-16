import React from 'react';
import { Form } from 'react-bootstrap';

export const SelectInput = ({
  value,
  onChange,
  label,
  options,
  ...otherProps
}) => (
  <Form.Group controlId="exampleForm.ControlSelect1">
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control as="select" value={value} onChange={onChange} {...otherProps}>
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);
