import { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { put } from '../../utils/axios';
import { TextInput } from '../form';

const PasswordChangeForm = () => {
  const [formProps, setFormProps] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleOnChange(e) {
    const { name, value } = e.currentTarget;

    setFormProps({ ...formProps, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    put('/users/current-user/change-password', formProps)
      .then(({ data: { data } }) => {
        setSubmitting(false);
        localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        setError(err.response?.data?.message);
        setSubmitting(false);
      });
  }

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="8">
        <div className="body-card">
          <Row>
            <Col>
              <div className="content-head">
                <h1>Change password</h1>
              </div>
            </Col>
          </Row>
          <section>
            <Row>
              <Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                  <TextInput
                    type="password"
                    name="currentPassword"
                    value={formProps.currentPassword}
                    label="Current passsword"
                    onChange={handleOnChange}
                  />
                  <TextInput
                    type="password"
                    name="newPassword"
                    value={formProps.newPassword}
                    label="New password"
                    onChange={handleOnChange}
                  />

                  <hr />
                  <button
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ position: 'relative', padding: '.5rem 2.5rem' }}
                  >
                    {submitting && (
                      <div
                        className="spi"
                        style={{
                          position: 'absolute',
                          height: 15,
                          width: 15,
                          top: 9,
                          left: 9,
                        }}
                      />
                    )}
                    Save
                  </button>
                </form>
              </Col>
            </Row>
          </section>
        </div>
      </Col>
    </Row>
  );
};

export default PasswordChangeForm;
