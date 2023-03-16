import { Col, Row, Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { withDashboard } from '../../hoc';
import Loader from '../../components/commons/Loader';
import { usePromiseFetch } from '../../hooks/usePromiseFetch';

const MenuPage = () => {
  const [fetching, response, error] = usePromiseFetch('/menu');

  if (fetching) return <Loader />;
  if (!response || error) return <Redirect to="/error" />;

  const { menuItems } = response;

  return (
    <div className="body-card">
      <Row>
        <Col>
          <div className="content-head">
            <h1>Menu</h1>{' '}
            <Link to="/menu/add" className="btn btn-primary">
              Add Dish
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <Table hover>
              <thead>
                <tr className="success">
                  <th>Dish Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((menu) => (
                  <tr key={menu._id}>
                    <td>
                      <Link
                        className="btn btn-light link"
                        to={`/menu/${menu._id}`}
                      >
                        {menu.name}
                      </Link>
                    </td>
                    <td>Rs. {menu.price}</td>
                    <td>
                      {menu.categories.map((category) => (
                        <span
                          key={category}
                          className="badge badge-info"
                          style={{ marginRight: 6 }}
                        >
                          {category}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Link
                        className="btn btn-secondary"
                        to={`/menu/${menu._id}/edit`}
                      >
                        <i className="fas fa-edit"></i>
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

export default withDashboard(MenuPage);
