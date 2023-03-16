import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { selectAuth } from '../selectors';
import NotFoundPage from '../components/commons/NotFound';
import {
  MenuPage,
  AddMenuPage,
  UpdateMenuPage,
  MenuItemPage,
  OrderDetailPage,
  ProfilePage,
} from '../pages';

const ProtectedRoutes = () => {
  const auth = useSelector(selectAuth);

  if (auth)
    return (
      <Switch>
        <Route path="/menu" component={MenuPage} exact />
        <Route path="/menu/add" component={AddMenuPage} exact />
        <Route path="/menu/:menuItemId/edit" component={UpdateMenuPage} exact />
        <Route path="/menu/:menuItemId" component={MenuItemPage} exact />

        <Route path="/orders/:orderId" component={OrderDetailPage} exact />

        <Route path="/profile" component={ProfilePage} exact />

        <Route component={NotFoundPage} />
      </Switch>
    );

  return <NotFoundPage />;
};

export default ProtectedRoutes;
