import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'

export default function NewModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} size={props.size}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((btn, index) =>
                        <Button variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>) :
                        <Button variant="primary" onClick={props.handleClose}>
                            Save Changes
                       </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}
