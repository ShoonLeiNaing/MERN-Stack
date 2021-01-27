import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, addCategory } from '../actions'
import Layout from '../components/layout/Layout'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckmarkCircleOutline,
    IoIosCheckmarkCircle,
    IoIosArrowForward,
    IoIosArrowDown
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function Category(props) {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState(" ")
    const [categoryParentId, setCategoryParentId] = useState(" ")
    const [categoryImage, setCategoryImage] = useState(" ")
    const [checked,setChecked]=useState([])
    const [expanded,setExpanded]=useState([])
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)


    const renderCategory = (categories) => {
        let categoriesArray = []
        for (let category of categories) {
            categoriesArray.push({
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategory(category.children)
            }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{renderCategory(category.children)}</ul>) : null}
                // </li>
            )
        }
        return categoriesArray;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleClose = () => {
        const form = new FormData()
        // const cat ={
        //     categoryName,
        //     categoryParentId,
        //     categoryImage
        // }
        // console.log(cat)
        form.append('name', categoryName)
        form.append('parentId', categoryParentId)
        form.append('categoryimage', categoryImage)
        dispatch(addCategory(form))
        setCategoryParentId("")
        setCategoryName("")
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }


    return (
        <Layout sidebar>
            <Container style={{ padding: '20px' }}>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* <Col md={12}>
                        {renderCategory(category.categories)}
                    </Col> */}
                    <CheckboxTree
                        nodes={renderCategory(category.categories)}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked)=>setChecked(checked)}
                        onExpand={(expanded)=>setExpanded(expanded)}
                        icons={{
                            check:<IoIosCheckmarkCircle/>,
                            uncheck:<IoIosCheckmarkCircleOutline />,
                            halfCheck:<IoIosCheckmarkCircle />,
                            expandClose: <IoIosArrowForward />,
                            expandOpen: <IoIosArrowDown/>,
                        }}
                    />
                </Row>
            </Container>
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={"Add New Category"}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    label="Name"
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select className='form-control'
                    value={categoryParentId}
                    onChange={(e) => setCategoryParentId(e.target.value)}
                >
                    <option>Select category</option>

                    {createCategoryList(category.categories).map((option) =>
                        <option key={option.value} value={option.value}>{option.name}</option>)}

                </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        </Layout>

    )
}

export default Category
