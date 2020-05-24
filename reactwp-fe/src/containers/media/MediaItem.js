import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Icon, Button } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { fetchAllMedia } from '../../actions/mediaAction'


function MediaItem(props) {

    const [show, changeShow] = useState(false)

    useEffect(() => {
        document.addEventListener("keydown", (e) => (e.key === 'Escape' ? closeModal() : null), false);
    }, [])


    const closeModal = () => {
        changeShow(false)
    }

    const removeMedia = async () => {
        await axios({
            method: 'post',
            url: `/admin/api/media/remove/${props.media.id}`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
        })
            .then(() => (
                props.getMedia
            ))
            .catch(err => console.log(err))
        await closeModal()
    }

    return (
        <>
            <Article onClick={() => changeShow(true)}>
                {getImageOrPdf(props.media.url, props.media.file_type)}
            </Article>
            {
                show &&
                <Modal>
                    {getImageOrPdf(props.media.url, props.media.file_type)}

                    <InfoMedia>
                        <h3>{props.media.name}</h3>
                        <p>{props.media.file_type}</p>
                        <p>{"http://" + props.media.url}</p>
                        <p>{props.media.width + " x " + props.media.height}</p>
                        <Button onClick={() => removeMedia()} danger>Remove</Button>
                        {props.showSelect &&
                            <Button onClick={() => {
                                changeShow(false)
                                props.selectCallback("http://" + props.media.url)
                            }} danger>Select</Button>
                        }
                    </InfoMedia>
                    <Close onClick={() => changeShow(false)} ><Icon type="close" /></Close>

                </Modal>

            }
        </>
    )
}

const getImageOrPdf = (url, type) => {
    if (type === 'application/pdf') {
        return <h3> PDF </h3>
    }
    else {
        return <img src={"http://" + url} />
    }
}

const Article = styled.div`
    cursor: pointer;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
    border-radius:7px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const InfoMedia = styled.div`
padding: 50px 5px 5px;
`
const Close = styled.button`
    position: absolute;
    top: 10px;
    padding: 7px 11px;
    right: 10px;
    border-radius: 50px;
    font-size: 1rem;
    color: white;
`

const Modal = styled.div`
    position: fixed;
    top: 75px;
    right: 0;
    left: 0;
    margin: 0 auto;
    display:grid;
    grid-template-columns: 1fr 20%;
    grid-gap: 15px;
    height:90vh;
    width:90vw;
    background:#fff;
    box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
    border-radius: 7px;
    padding:15px;
    transition: all 0.3s ease;
    animation-duration: 0.3s;
    animation-name: slidein;
    img{
        width:100%;
        height: 100%;
        object-fit:contain;
    }
`



const mapDispatchToProps = (dispatch) => ({
    getMedia() {
        return dispatch(fetchAllMedia())
    }
})

export default connect(null, mapDispatchToProps)(MediaItem)