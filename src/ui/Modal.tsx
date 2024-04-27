import {default as BootstrapModal} from "react-bootstrap/Modal";
import {Button} from "@mui/material";
import React, {useState} from "react";

const initData = {
    content: <></>,
    title: "",
    callback: (res) => {},
}

export function Modal() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(initData)
    window.app.openModal = (data) => {
        setShow(true);
        setData(data);
    }
    window.app.closeModal = () => setShow(false);

    function close() {
        setShow(false);
        data.callback && data.callback(false);
    }

    function submit() {
        setShow(false);
        data.callback && data.callback(true);
    }

    return (
        <BootstrapModal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <BootstrapModal.Header closeButton>
                {data.title && <BootstrapModal.Title id="contained-modal-title-vcenter">
                    {data.title}
                </BootstrapModal.Title>}
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {data.content}
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <Button onClick={close}>закрыть</Button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
}