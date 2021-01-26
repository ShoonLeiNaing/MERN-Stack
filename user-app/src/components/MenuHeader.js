import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCategories } from '../actions/category.actions'
import './menuHeaderStyle.css'

export default function MenuHeader() {

    const category = useSelector(state=>state.category)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllCategories())
    },[])
    const renderCategory = (categories) => {
        let categoriesArray = []
        for (let category of categories) {
            categoriesArray.push(
                <li key={category.name}>
                    { category.parentId? <a href={category.slug}> {category.name}</a> :
                    <span> {category.name}</span>}
                   
                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)}</ul>) : null}
                </li>
            )
        }
        return categoriesArray;
    }
    return (
        <div className="menuHeader">
            <ul>
                {category.categories.length > 0 ?
                renderCategory(category.categories):null}
            </ul>
        </div>
    )
}
