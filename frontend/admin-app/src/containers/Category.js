import React, { useEffect,useState } from 'react'
import { Container, Row, Col,Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories,addCategory } from '../actions'
import Layout from '../components/layout/Layout'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'

function Category(props) {
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState(" ")
    const [categoryParentId,setCategoryParentId] = useState(" ")
    const [categoryImage,setCategoryImage] = useState(" ")
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    

    const renderCategory = (categories) => {
        let categoriesArray = []
        for (let category of categories) {
            categoriesArray.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)}</ul>) : null}
                </li>
            )
        }
        return categoriesArray;
    }

    const createCategoryList =(categories,options=[])=>{
        for(let category of categories){
            options.push({
                value:category._id,
                name:category.name
            })
            if(category.children.length > 0){
                createCategoryList(category.children,options)
            }
        }
        return options;
    }

    const handleClose = () =>{
        const form = new FormData()
        // const cat ={
        //     categoryName,
        //     categoryParentId,
        //     categoryImage
        // }
        // console.log(cat)
        form.append('name',categoryName)
        form.append('parentId',categoryParentId)
        form.append('categoryimage',categoryImage)
        dispatch(addCategory(form))
        setCategoryParentId("")
        setCategoryName("")
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleCategoryImage = (e)=>{
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
                    <Col md={12}>
                        {renderCategory(category.categories)}
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
                        onChange={(e)=>setCategoryName(e.target.value)}
                    />
                    <select className='form-control'
                    value={categoryParentId}
                    onChange={(e)=>setCategoryParentId(e.target.value)}
                    >
                        <option>Select category</option>
                      
                        { createCategoryList(category.categories).map((option)=>
                        <option key={option.value} value={option.value}>{option.name}</option>)}
                       
                    </select>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage}/>
            </Modal>
        </Layout>

    )
}

export default Category
