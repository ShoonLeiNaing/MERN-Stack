import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../actions'
import Layout from '../components/Layout/Layout'
import { generatePublicUrl } from '../urlConfig'
import './productListPageStyle.css'

export default function ProductListPage(props) {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const [priceRange,setPriceRange]=useState({
        under50k : "50,000",
        under500k : "500,000",
        under1000k : "1,000,000"
    })
    useEffect(() => {
        console.log(props)
        const { match } = props
        dispatch(getProductBySlug(match.params.slug))
    }, [])
    return (
        <Layout>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} phones {priceRange[key]} kyats</div>
                                <button>View All</button>
                            </div>
                            <div style={{display:'flex'}}>
                            {
                                product.productsByPrice[key].map((product) => {
                                    return (
                                        <div className="productContainer">
                                            <div className="productImageContainer">
                                                <img src={generatePublicUrl(product.pictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '8px 0' }}>{product.name}</div>
                                                <div style={{ marginBottom: '10px ' }}>
                                                    <span>4.8</span>
                                                    <span>3000</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>

                                            </div>
                                        </div>
                                    )

                                })
                            }
                            </div>

                        </div>
                    )
                }
                )
            }

        </Layout>
    )
}
