import Home from "./views/Home.js";
import PageNotFound from "./views/PageNotFound.js";

import Auctions from "./views/auction/Auctions.js";
import AuctionDetail from "./views/auction/AuctionDetail.js";
import AuctionCreate from "./views/auction/AuctionCreate.js";
import AuctionUpdate from "./views/auction/AuctionUpdate.js";

import ProductDetail from "./views/product/ProductDetail.js";
import ProductCreate from "./views/product/ProductCreate.js";
import ProductUpdate from "./views/product/ProductUpdate.js";

import Users from "./views/user/Users.js";
import UserCreate from "./views/user/UserCreate.js";
import UserDetail from "./views/user/UserDetail.js";
import UserUpdate from "./views/user/UserUpdate.js";

import OfferCreate from "./views/offer/OfferCreate.js";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/auctions",
    component: Auctions,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/auction/:id",
    component: AuctionDetail,
  },
  {
    path: "/create/auction",
    component: AuctionCreate,
  },
  {
    path: "/create/user",
    component: UserCreate,
  },
  {
    path: "/user/:id",
    component: UserDetail,
  },
  {
    path: "/update/user/:id",
    component: UserUpdate,
  },
  {
    path: "/update/auction/:id",
    component: AuctionUpdate,
  },
  {
    path: "/product/:id",
    component: ProductDetail,
  },
  {
    path: "/create/product",
    component: ProductCreate,
    props: true,
  },
  {
    path: "/update/product/:id",
    component: ProductUpdate,
  },
  {
    path: "/create/offer",
    component: OfferCreate,
  },
  {
    //geen path, default route voor foute page url's
    component: PageNotFound,
  },
];

export default routes;
