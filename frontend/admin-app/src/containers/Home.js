import React,{useState,useEffect}from 'react'
import {isUserLoggedIn} from '../actions/auth.actions'
import { NavLink } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import './homeStyle.css'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
    // const auth = useSelector(state=>state.auth)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     if(!auth.authenticate)
    //         dispatch(isUserLoggedIn())
    // })
    return (
        <Layout sidebar>
           Hello
            {/* <Jumbotron className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
            </Jumbotron> */}
        </Layout>
    )
}
