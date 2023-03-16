import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../../components/commons/Loader';
import { withDashboard } from '../../hoc';
import { usePromiseFetch } from '../../hooks/usePromiseFetch';
import './styles.scss';

const DashboardPage = () => {
  const [fetching, response, error] = usePromiseFetch('/orders');

  if (fetching) return <Loader />;
  if (!response || error) return <Redirect to="/error" />;

  const { orders } = response;
  return (
    <div className="body-card">
      <Row>
        <Col>
          <div className="content-head">
            <h1>Recent Orders</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <Table hover responsive>
              <thead>
                <tr className="success">
                  <th>Customer</th>
                  <th>Phone number</th>
                  <th>Address</th>
                  <th>Ordered date</th>
                  <th>Delivery date</th>
                  <th>Total cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                    <td>{order.customer.phoneNumber}</td>
                    <td>{order.customer.address}</td>
                    <td>{new Date(order.orderedDate).toLocaleString()}</td>
                    <td>{new Date(order.deliveryDate).toLocaleString()}</td>
                    <td>Rs. {order.totalCost}</td>
                    <td>
                      <Link
                        className="btn btn-secondary"
                        to={`/orders/${order._id}`}
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
  );
};

export default withDashboard(DashboardPage);
