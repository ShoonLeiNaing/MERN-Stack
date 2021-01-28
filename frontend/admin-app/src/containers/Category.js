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
    const [updateCategoryShow, setUpdateCategoryShow] = useState(false);
    const [categoryName, setCategoryName] = useState(" ")
    const [categoryParentId, setCategoryParentId] = useState(null)
    const [categoryImage, setCategoryImage] = useState(" ")
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandeArray] = useState([])
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)


    const renderCategory = (categories) => {
        let categoriesArray = []
        for (let category of categories) {
            categoriesArray.push({
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategory(category.children)
            })
        }
        return categoriesArray;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', categoryParentId)
        form.append('categoryimage', categoryImage)
        dispatch(addCategory(form))
        setCategoryParentId("")
        setCategoryName("")
        setShow(false)
    };
    const updateHandleShow = () => {
        setUpdateCategoryShow(true)
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => categoryId == cat.value)
            category && checkedArray.push(category)
            console.log({ checkedArray })
            setCheckedArray(checkedArray)
        })
        const expandedArray = []
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((cat, _index) => categoryId == cat.value)
            category && expandedArray.push(category)
            console.log({ expandedArray })
            setExpandeArray(expandedArray)
        })

        // console.log({checked,expanded,categories})
    }
    const handleShow = () => setShow(true);
    // const updateHandleShow = () => setUpdateCategoryShow(true)
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleUpdateInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckArray = checkedArray.map((item, _index) => _index == index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckArray)

        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => _index == index ? { ...item, [key]: value } : item)
            setExpandeArray(updatedExpandedArray)
        }
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
                        onCheck={(checked) => setChecked(checked)}
                        onExpand={(expanded) => setExpanded(expanded)}
                        icons={{
                            check: <IoIosCheckmarkCircle />,
                            uncheck: <IoIosCheckmarkCircleOutline />,
                            halfCheck: <IoIosCheckmarkCircle />,
                            expandClose: <IoIosArrowForward />,
                            expandOpen: <IoIosArrowDown />,
                        }}
                    />
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateHandleShow}>Update</button>
                    </Col>
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
            {/* Edit Category Modal */}
            <Modal
                show={updateCategoryShow}
                handleClose={() => setUpdateCategoryShow(false)}
                modalTitle={"Update Categories"}
                size="lg"
            >
                {expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Product Description`}
                                    onChange={(e) => handleUpdateInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.parentId}
                                    onChange={(e) => handleUpdateInput('parentId', e.target.value, index, 'expanded')}
                                >
                                    <option>Select category</option>

                                    {createCategoryList(category.categories).map((option) =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)}

                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.type}
                                    onChange={(e) => handleUpdateInput('type', e.target.value, index, 'expanded')}
                                >
                                    <option>Select Type</option>
                                    <option>Store</option>
                                    <option>Product</option>
                                    <option>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

                {checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Product Description`}
                                    onChange={(e) => handleUpdateInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.parentId}
                                    onChange={(e) => handleUpdateInput('parentId', e.target.value, index, 'checked')}
                                >
                                    <option>Select category</option>

                                    {createCategoryList(category.categories).map((option) =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)}

                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.type}
                                    onChange={(e) => handleUpdateInput('type', e.target.value, index, 'checked')}
                                >
                                    <option>Select Type</option>
                                    <option>Store</option>
                                    <option>Product</option>
                                    <option>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
            </Modal>
        </Layout>

    )
}

export default Category
