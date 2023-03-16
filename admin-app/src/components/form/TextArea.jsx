import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const TextArea = ({ handleChange, rows, label, ...otherProps }) => {
  useEffect(() => {
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        'style',
        'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
      );
      tx[i].addEventListener('input', OnInput, false);
    }
  }, []);

  function OnInput() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control as="textarea" onChange={handleChange} {...otherProps} />
    </Form.Group>
  );
};
