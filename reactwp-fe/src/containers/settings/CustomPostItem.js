import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { Icon, Button, Popconfirm, Drawer, message } from 'antd'
import slugify from 'slugify'

import Card from '../../compontnts/card/Card'

export default function CustomPostItem({ type, update }) {

    const [hendleHover, setHendleHover] = useState(false)
    const [name, setName] = useState(type.type)
    const [visible, setVisible] = useState(false)
    const [icon, setIcon] = useState(type.icon)

    const saveType = async () => {
        await axios({
            method: "post", url: '/admin/api/post/type/add',
            headers: { "Authorization": 'Bearer ' + Cookies.get('token') },
            data: { type: name, icon: icon }
        }).then(res => {
            if (!res.data.error) {
                message.success(res.data.message)
                return update()
            }
            else return message.error(res.data.message)
        }).catch(err => console.log(err))
    }
    const deleteType = async () => {
        await axios({
            method: "delete", url: `/admin/api/post/type/remove/${type.id}`,
            headers: { "Authorization": 'Bearer ' + Cookies.get('token') },
        }).then(res => {
            if (!res.data.error) {
                message.success(res.data.message)
                return update()
            }
            else
                return message.error(res.data.message)
        })
            .catch(err => console.log(err))
    }


    const onClose = () => setVisible(false)

    const icons = ['warning', 'copy', 'highlight', 'align-center', 'align-left',
        'align-right', 'bold', 'pie-chart', 'line-chart', 'book', 'container',
        'cloud', 'experiment', 'environment', 'file', 'fire', 'gift', 'shopping']
    return (
        <div
            onMouseEnter={() => setHendleHover(true)}
            onMouseLeave={() => setHendleHover(false)}
        >
            <Card style={{ alignItems: "center" }}
                display="flex"
                justify="space-between"
            >
                <Div2>
                    <H2 onClick={() => setVisible(true)}><Icon type={icon} /></H2>
                    <Type value={name} onChange={e => setName(slugify(e.target.value, { replacement: '_', strict: true, lower: true, }))} />
                </Div2>

                <Div>
                    {hendleHover && (<>
                        <Button
                            type="dashed"
                            shape="circle"
                            icon="save"
                            onClick={() => saveType()}
                        />
                        <Popconfirm
                            placement="topRight"
                            title={'Are you sure about deleting? 🌚'}
                            onConfirm={() => deleteType()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="dashed"
                                style={{ borderColor: "red" }}
                                shape="circle" icon="delete"
                            />
                        </Popconfirm>
                    </>)}
                </Div>
            </Card>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                {icons.map((i, k) => <Icon key={k} onClick={() => setIcon(i)} type={i} style={{ fontSize: '2.5rem', margin: '10px' }} />)}
            </Drawer>
        </div>
    )
}


const H2 = styled.h2`
    margin:  0 5px;
    cursor: pointer;
`
const Type = styled.input`
    margin:  0 5px;
    border: none;
    font-size: 1rem;
    font-weight: 600;

    &:focus{
        outline: none;
    }
`
const Div2 = styled.div`
    display:flex;
    margin: 2.5px 0;
`
const Div = styled.div`
    display: flex;
    justify-content: inherit;
    width: 75px;
`
