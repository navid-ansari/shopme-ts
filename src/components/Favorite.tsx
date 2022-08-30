import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// component
import Detail from "./Detail";

const Favorite = (props: any) => {
 const { category, description, id, image, price, rating, title } =
  props.favorite;
 const { rate, count } = rating || {};

 return <Detail product={props.favorite} />;
};

export default Favorite;

Favorite.prototype = {
 favorite: PropTypes.shape({
  category: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.shape({ rate: PropTypes.number, count: PropTypes.number }),
  title: PropTypes.string,
  isFavorite: PropTypes.bool,
  isAddedToCart: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  toggleCart: PropTypes.func,
 }),
};
