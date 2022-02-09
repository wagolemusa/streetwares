import React, { useState } from 'react';
import Layout from '../../componets/Loyout';
import { Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from '../../componets/UI/Input';
import { addProduct } from '../../actions/productactions';

const Products = (Props) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState('');
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        for (let pic of productPictures) {
            form.append('productPictures', pic);
        }
        dispatch(addProduct(form));
    }
    const handleShow = () => setShow(true);


    // This fumction calls all selected options
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const HandleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }
   

    const RenderProducts = () => {
        return(
            <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>

                {
                    product.products.length > 0 ?
                    product.products.map(product => 
                        <tr>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>....</td>
                      </tr>
                        ): null
                }
          
            </tbody>
          </Table>
        )
    }


    return (
        <Layout sidebar>
            <div className="row">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Products</h1>
                    <button onClick={handleShow}>Add Products</button>
                </div>
                
                <RenderProducts />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <Input
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        value={price}
                        placeholder={`Price`}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        value={description}
                        placeholder={`Description`}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <br />

                    {
                        productPictures.length > 0 ?
                            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                    }
                    <input type="file" name="productPictures" onChange={HandleProductPictures} />

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>

    )
}

export default Products;