import React from 'react';
import { Form } from 'react-bootstrap';

export const TextInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        onChange={handleChange}
        {...otherProps}
        autoComplete="off"
      />
    </Form.Group>
  );
};
