import React from 'react';
import { Form } from 'react-bootstrap';

export const Checkbox = ({ ...otherProps }) => {
  return <Form.Check {...otherProps} />;
};
