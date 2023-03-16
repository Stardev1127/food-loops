import { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { withDashboard } from '../../hoc';
import MenuForm from '../../components/menu-form';
import { post } from '../../utils/axios';

const AddMenuPage = () => {
  const history = useHistory();

  const [formProps, setFormProps] = useState({
    isEnabled: true,
    isHotMeal: false,
    name: '',
    description: '',
    price: 0,
    servingSize: 0,
    types: [],
    categories: [],
    nutrients: [],
  });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    post('/menu', formProps)
      .then(({ data: { data } }) => history.push(`/menu/${data.menuItem._id}`))
      .catch((err) => setError(err.response?.data?.message));
  }

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <div className="body-card">
            <Row>
              <Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="content-head">
                  <h1>Add new dish</h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <MenuForm
                  handleSubmit={handleSubmit}
                  formProps={formProps}
                  setFormProps={setFormProps}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withDashboard(AddMenuPage);
