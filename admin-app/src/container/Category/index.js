import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions";
import Layout from "../../componets/Loyout";
import { Modal, Button } from "react-bootstrap";
import Input from '../../componets/UI/Input'


const Category = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };
        // console.log(cat);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let Mycategories = [];
        for (let category of categories) {
            Mycategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return Mycategories;
    }

    // This fumction calls all selected options
    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    // Function handle Upload Image
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    return (
        <Layout sidebar>
            <div className="container">
                <div className="row">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1>Category</h1>
                        <button onClick={handleShow}>Add</button>
                    </div>

                </div>
                <div className="row">
                    <ul>
                        {renderCategories(category.categories)}
                    </ul>
                </div>
            </div>

            <div className="container">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            value={categoryName}
                            placeholder={`Category Name`}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <br/>
                        <select className="form-control" 
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                            <option>Select Category</option>
                            {
                                createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                        <br/>
                        <input type="file" name="categoryImage" onChange={handleCategoryImage} />

                    </Modal.Body>
                    <Modal.Footer>
           
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </Layout>

    )
}

export default Category;