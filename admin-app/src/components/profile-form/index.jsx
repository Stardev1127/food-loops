import { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../actions';
import { selectAuth } from '../../selectors';
import { patch } from '../../utils/axios';
import { TextInput } from '../form';

const ProfileForm = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [formProps, setFormProps] = useState(auth);
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

    patch('/users/current-user', formProps)
      .then(({ data: { data } }) => {
        dispatch(
          fetchUser(() => {
            setSubmitting(false);
          }, data.user)
        );
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
                <h1>Account</h1>
              </div>
            </Col>
          </Row>
          <section>
            <Row>
              <Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                  <TextInput
                    name="name"
                    value={formProps.name}
                    label="Full name"
                    onChange={handleOnChange}
                  />
                  <TextInput
                    type="email"
                    name="email"
                    value={formProps.email}
                    label="Email"
                    onChange={handleOnChange}
                  />
                  <TextInput
                    type="number"
                    name="phoneNumber"
                    value={formProps.phoneNumber}
                    label="Phone number"
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

export default ProfileForm;
