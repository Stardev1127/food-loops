import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { withDashboard } from '../../hoc';
import MenuForm from '../../components/menu-form';
import { patch } from '../../utils/axios';
import { usePromiseFetch } from '../../hooks/usePromiseFetch';
import Loader from '../../components/commons/Loader';

const UpdateMenuPage = () => {
  const { menuItemId } = useParams();
  const [fetching, response, fetchError] = usePromiseFetch(
    `/menu/${menuItemId}`
  );

  const history = useHistory();

  const [formProps, setFormProps] = useState({
    isEnabled: true,
    isHotMeal: false,
    name: '',
    description: '',
    price: 0,
    servingSize: 0,
    categories: [],
    types: [],
    nutrients: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (response && response.menuItem) setFormProps(response.menuItem);
  }, [response]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    patch(`/menu/${menuItemId}`, formProps)
      .then(() => history.push(`/menu/${menuItemId}`))
      .catch((err) => setError(err.response?.data?.message));
  }

  if (fetching) return <Loader />;
  if (!response || fetchError) return <Redirect to="/error" />;

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <div className="body-card">
            <Row>
              <Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="content-head">
                  <h1>Update dish</h1>
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

export default withDashboard(UpdateMenuPage);
