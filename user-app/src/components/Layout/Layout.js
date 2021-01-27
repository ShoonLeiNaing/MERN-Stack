import React from 'react'
import Header from '../Header/Header'
import MenuHeader from '../MenuHeader/MenuHeader'

export default function Layout(props) {
    return (
        <>
            <Header />
            <MenuHeader />
            {props.children}
        </>
    )
}
