import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../../components/commons/Loader';
import { withDashboard } from '../../hoc';
import { usePromiseFetch } from '../../hooks/usePromiseFetch';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [fetching, response, error] = usePromiseFetch(`/orders/${orderId}`);

  if (fetching) return <Loader />;
  if (!response || error) return <Redirect to="/error" />;

  const { order } = response;
  const { customer, orderedItems } = order;
  return (
    <div>
      <Row>
        <Col>
          <div className="content-head linear">
            <h1>Order</h1>
            <p>
              <small>Code: {order._id}</small>
            </p>
          </div>
        </Col>
      </Row>
      <section>
        <Row>
          <Col md="6" style={{ marginBottom: 15 }}>
            <Card>
              <Card.Header>
                <strong>Customer</strong>
              </Card.Header>
              <Card.Body>
                <ul className="neutralize">
                  <li>
                    <i className="fas fa-user"></i>
                    &nbsp;&nbsp;&nbsp;
                    {`${customer.firstName} ${customer.lastName}`}
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    &nbsp;&nbsp;&nbsp;
                    {customer.phoneNumber}
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    &nbsp;&nbsp;&nbsp;
                    {customer.email}
                  </li>
                  <li>
                    <i class="fas fa-map-marker-alt"></i>
                    &nbsp;&nbsp;&nbsp;
                    {customer.address}
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6" style={{ marginBottom: 15 }}>
            <Card>
              <Card.Header>
                <strong>Order info</strong>
              </Card.Header>
              <Card.Body>
                <ul className="neutralize">
                  <li>
                    Ordered date: {new Date(order.orderedDate).toLocaleString()}
                  </li>
                  <li>
                    Delivery date:{' '}
                    {new Date(order.deliveryDate).toLocaleString()}
                  </li>

                  <hr />
                  <li>
                    Total: Rs. {orderedItems.reduce((a, b) => a + b.price, 0)}
                  </li>
                  <li>Delivery charge: Rs. {order.deliveryCharge}</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <strong>Grand total: Rs. {order.totalCost}</strong>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <br />
        <div className="body-card">
          <Row>
            <Col>
              <section>
                <Table hover responsive>
                  <thead>
                    <tr className="success">
                      <th>Meal</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedItems.map((orderedItem) => (
                      <tr key={orderedItem._id}>
                        <td>{orderedItem.menuItem.name}</td>
                        <td>x{orderedItem.quantity}</td>
                        <td>Rs. {orderedItem.price}</td>
                        <td>
                          <Link
                            className="btn btn-secondary"
                            to={`/menu/${orderedItem.menuItem._id}`}
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </section>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default withDashboard(OrderDetailPage);
