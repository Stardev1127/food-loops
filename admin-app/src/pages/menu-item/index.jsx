import { Link, Redirect, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { withDashboard } from '../../hoc';
import Loader from '../../components/commons/Loader';
import './menu-item.scss';
import UploadImage from './UploadImage';
import { get, post, del } from '../../utils/axios';
import { useEffect } from 'react';
import { useState } from 'react';

const MenuItemPage = () => {
  const { menuItemId } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    get(`/menu/${menuItemId}`)
      .then(({ data: { data } }) => {
        setMenuItem(data.menuItem);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  if (!menuItem) return <Loader />;
  if (fetchError) return <Redirect to="/error" />;

  function handleImageUpload(image, callback) {
    let formData = new FormData();
    formData.append('image', image);

    post(`/menu/${menuItemId}/photo`, formData).then(({ data: { data } }) => {
      setMenuItem({ ...menuItem, photo: data.photo });
      callback();
    });
  }

  function handleImageRemove() {
    setMenuItem({ ...menuItem, photo: null });
    del(`/menu/${menuItemId}/photo`);
  }

  const {
    isEnabled,
    isHotMeal,
    name,
    description,
    price,
    servingSize,
    types,
    categories,
    nutrients,
    photo,
  } = menuItem;

  return (
    <div id="menuDetail">
      <Row>
        <Col>
          <section>
            <div className="body-card">
              <Link
                to={`/menu/${menuItem._id}/edit`}
                className="btn btn-warning float-btn"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <Row>
                <Col md="6" className=" l-wrapper">
                  <UploadImage
                    image={photo}
                    handleImageRemove={handleImageRemove}
                    handleImageUpload={handleImageUpload}
                  />
                </Col>
                <Col md="6" className="r-wrapper">
                  <div className="g-info">
                    <div className="md-cate" style={{ marginTop: 0 }}>
                      <span className="badge badge-secondary">
                        {isEnabled ? 'Enabled' : 'Not enabled'}
                      </span>
                      <span className="badge badge-warning">
                        {isHotMeal ? 'Hot meal' : 'Not hot meal'}
                      </span>
                    </div>

                    <h1>{name}</h1>
                    <p className="text-preline">{description}</p>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 24 + 'px',
                        marginTop: 12 + 'px',
                        color: '#47b581',
                      }}
                    >
                      Rs. {price}
                    </p>
                  </div>

                  <div className="md-cate">
                    <h4>Meal Type</h4>
                    {types.map((type) => (
                      <span className="badge badge-primary" key={type}>
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="md-cate">
                    <h4>Dish Category</h4>
                    {categories.map((category) => (
                      <span className="badge badge-info" key={category}>
                        {category}
                      </span>
                    ))}
                  </div>

                  <hr />
                  <div className="n-panel">
                    <h4>Nutritions</h4>
                    <div className="d-flex eq-w-child">
                      <div>
                        <div className="n-circle">{servingSize}Oz</div>
                        <p className="text-center">
                          <small>Serving Size</small>
                        </p>
                      </div>
                      {nutrients.map((nutrient) => (
                        <div key={nutrient.name}>
                          <div className="n-circle">
                            {nutrient.amount + '' + nutrient.unit}
                          </div>
                          <p className="text-center">
                            <small>{nutrient.name}</small>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default withDashboard(MenuItemPage);
