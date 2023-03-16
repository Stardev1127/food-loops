import React from 'react';
import { Form } from 'react-bootstrap';

export const FileInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <Form.Group>
      <Form.File label={label} onChange={handleChange} {...otherProps} />
    </Form.Group>
  );
};
