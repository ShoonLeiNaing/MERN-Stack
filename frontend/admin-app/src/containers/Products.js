import React,{useState} from 'react'
import Layout from '../components/layout/Layout'
import { Container, Row, Col,Modal,Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/UI/Input'
import { addNewProduct } from '../actions/product.action'

export default function Products() {
    const [show, setShow] = useState(false);
    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[description,setDescription]=useState("")
    const[quantity,setQuantity]=useState("")
    const[category,setCategory]=useState("")
    const[productpicture,setProductpicture]=useState([])
    const myCategory=useSelector(state=>state.category)
    const dispatch=useDispatch()

    const handleShow = () => setShow(true);
    const handleClose = () => {
        const form = new FormData()
        form.append('name',name)
        form.append('price',price)
        form.append('description',description)
        form.append('quantity',quantity)
        form.append('category',category)
        for(let pic of productpicture){
            form.append('productpicture',pic)
        }
        dispatch(addNewProduct(form))
        setShow(false)
    };
    const createCategoryList =(categories,options=[])=>{
        for(let cat of categories){
            options.push({
                value:cat._id,
                name:cat.name
            })
            if(cat.children.length > 0){
                createCategoryList(cat.children,options)
            }
        }
        return options;
    }
    const handleProductpicture=(e)=>{
        setProductpicture([
            ...productpicture,
            e.target.files[0]
        ])
        console.log(productpicture)
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
                        {/* {renderCategory(category.categories)} */}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <Input
                        label="Description"
                        value={description}
                        placeholder={`Product Description`}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                     <Input
                        label="Price"
                        value={price}
                        placeholder={`Product Price`}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                     <Input
                        label="Quantity"
                        value={quantity}
                        placeholder={`Product Quantity`}
                        onChange={(e)=>setQuantity(e.target.value)}
                    />
                     
                     {/* <Input
                        label="Name"
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e)=>setName(e.target.value)}
                    /> */}
                    <select className='form-control'
                    value={myCategory}
                    onChange={(e)=>setCategory(e.target.value)}
                    >
                        <option>Select category</option>
                      
                        { createCategoryList(myCategory.categories).map((option)=>
                        <option key={option.value} value={option.value}>{option.name}</option>)}
                       
                    </select>
                    {
                        productpicture.length>0?
                        productpicture.map((pic,index)=><div key={index}>{pic.name}</div>) : null
                    }
                    <input type="file" name="productpicture" onChange={handleProductpicture}/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}
