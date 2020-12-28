import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Admin = props => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('Horror');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productTime, setProductTime] = useState(0);
  const [productAge, setProductAge] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productDate, setProductDate] = useState(0);
  const [productHall, setProductHall] = useState(0);
  const [productDesc, setProductDesc] = useState('');

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('Horror');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductTime(0);
    setProductAge(0);
    setProductRating(1)
    setProductDate('');
    setProductHall('')
    setProductDesc('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productTime,
        productAge,
        productRating,
        productDate,
        productHall,
        productDesc,
      })
    );
    resetForm();

  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add New Movie
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new movie
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "horror",
                name: "Horror"
              }, {
                value: "comedy",
                name: "Comedy"
              }, {
                value: "action",
                name: "Action"
              }, {
                value: "drama",
                name: "Drama"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <FormInput
              label="Age"
              type="number"
              min="0"
              max="100"
              step="1"
              value={productAge}
              handleChange={e => setProductAge(e.target.value)}
            />


              <FormInput
              label="Time"
              type="Time"
              value={productTime}
              handleChange={e => setProductTime(e.target.value)}
            />

            <FormInput
              label="Date"
              type="date"
              value={productDate}
              handleChange={e => setProductDate(e.target.value)}
            />

            <FormInput
              label="Rating"
              type="number"
              min="1.0"
              max="5.0"
              step="0.5"
              value={productRating}
              handleChange={e => setProductRating(e.target.value)}
            />

            <FormInput
              label="Hall"
              type="number"
              min="1"
              max="8"
              step="1"
              value={productHall}
              handleChange={e => setProductHall(e.target.value)}
            />

            <CKEditor
              onChange={evt => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">
              Add Movie
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Movies
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        productTime,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            {productPrice}₪
                          </td>
                          <td>
                            Time: {productTime}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Admin;