import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import { addNewProduct } from '../actions/product.action'
import './productStyle.css'

export default function Products() {
    const [show, setShow] = useState(false);
    const [productDetailsShow, setProductDetailsShow] = useState(false);
    const [x,setX]=useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [productpicture, setProductpicture] = useState([])
    const myCategory = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()

    const handleShow = () => setShow(true);
    const handleClose = () => {
        const form = new FormData()
        form.append('name', name)
        form.append('price', price)
        form.append('description', description)
        form.append('quantity', quantity)
        form.append('category', category)
        for (let pic of productpicture) {
            form.append('productpicture', pic)
        }
        dispatch(addNewProduct(form))
        setShow(false)
    };
    const createCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({
                value: cat._id,
                name: cat.name
            })
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options)
            }
        }
        return options;
    }
    const handleProductpicture = (e) => {
        setProductpicture([
            ...productpicture,
            e.target.files[0]
        ])
        console.log(productpicture)
    }

    const renderProductModal = () => {
        <Modal show={show} handleClose={handleClose} modalTitle={"Add New Product"}>

            <Input
                label="Name"
                value={name}
                placeholder={`Product Name`}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                label="Description"
                value={description}
                placeholder={`Product Description`}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label="Price"
                value={price}
                placeholder={`Product Price`}
                onChange={(e) => setPrice(e.target.value)}
            />
            <Input
                label="Quantity"
                value={quantity}
                placeholder={`Product Quantity`}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <select className='form-control'
                value={myCategory}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option>Select category</option>

                {createCategoryList(myCategory.categories).map((option) =>
                    <option key={option.value} value={option.value}>{option.name}</option>)}

            </select>
            {
                productpicture.length > 0 ?
                    productpicture.map((pic, index) => <div key={index}>{pic.name}</div>) : null
            }
            <input type="file" name="productpicture" onChange={handleProductpicture} />


        </Modal>
    }
    const productDetailsHandleClose = () => {
        setProductDetailsShow(false)
    }
    const showProductDetailsModal = (product) => {
        setX(product)
        setProductDetailsShow(true)
        console.log(product)
    }

    const renderProductDetailsModal = () => {
        if(!x){
            return null
        }
        return (
            <Modal
                show={productDetailsShow}
                size={"lg"}
                handleClose={productDetailsHandleClose}
                modalTitle={"Product Details"}
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{x.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Price</label>
                        <p className="value">{x.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Quantity</label>
                        <p className="value">{x.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{x.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{x.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        <div style={{display:"flex"}}>
                        {/* {console.log(x)} */}
                        { x.pictures.map(pic => 
                            <div className="productImageContainer" >
                                <img src={`http://localhost:2000/public/${pic.img}`} />
                            </div>)}
                            </div>
                    </Col>
                </Row>

            </Modal>
        )
    }
    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>category</th>

                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ?
                        product.products.map((x) =>
                            <tr onClick={()=>showProductDetailsModal(x)} key={x._id}>
                                <td>1</td>
                                <td>{x.name}</td>
                                <td>{x.price}</td>
                                <td>{x.quantity}</td>
                                <td>{x.category.name}</td>
                            </tr>) : null}
                </tbody>
                
            </Table>
        )
    }
    return (
        <Layout sidebar>
            <Container style={{ padding: '20px' }}>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                    </Col>
                </Row>
                {/* <Row>
                    <Col>


                    </Col>
                </Row> */}
            </Container>
            {renderProductModal()}
            {renderProductDetailsModal()}

        </Layout>
    )
}
