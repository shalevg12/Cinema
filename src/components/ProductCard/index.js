import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import { addProduct } from './../../redux/Cart/cart.actions';
import Button from './../forms/Button';
import './styles.scss';

const mapState = state => ({
  product: state.productsData.product
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productThumbnail,
    productName,
    productPrice,
    productTime,
    productAge,
    productRating,
    productDate,
    productHall,
    productDesc,
  } = product;

  useEffect(() => {
    dispatch(
      fetchProductStart(productID)
    )

    return () => {
      dispatch(
        setProduct({})
      )
    }

  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(
      addProduct(product)
    );
    history.push('/cart');
  }

  const configAddToCartBtn = {
    type: 'button'
  }

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>
              {productName}
            </h1>
          </li>
          <li>
            <span>
              Price: {productPrice}₪
            </span>
          </li>
          <li>
            <span>
              Time: {productTime}
            </span>
          </li>
          <li>
            <span>
              Date: {productDate}
            </span>
          </li>
          <li>
            <span>
              Rating: {productRating}
            </span>
          </li>
          <li>
            <span>
              Age: {productAge}
            </span>
          </li>
          <li>
            <span>
              Hall: {productHall}
            </span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </div>
          </li>
          <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: productDesc }} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;
