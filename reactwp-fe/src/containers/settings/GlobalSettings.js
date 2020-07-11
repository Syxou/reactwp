import React, { useEffect, useState } from 'react'
import { Button, Input, message } from 'antd';
import Cookies from 'js-cookie'
import axios from 'axios'

import Card from '../../components/card/Card'


const { TextArea } = Input;

export default function GlobalSettings() {

    let [siteUrl, setSiteUrl] = useState('')
    let [homeUrl, setHomeUrl] = useState('')
    let [aminUrl, setAminUrl] = useState('')
    let [siteName, setSiteName] = useState('')
    let [siteDesc, setSiteDesc] = useState('')
    let [save, setSave] = useState(false)

    useEffect(() => {
        axios({
            method: 'get',
            url: `/admin/api/global/all`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            }
        }).then(res => {
            console.log(res.data)
            setSiteUrl(res.data.siteurl.option_value)
            setHomeUrl(res.data.home.option_value)
            setAminUrl(res.data.admin_home.option_value)
            setSiteName(res.data.sitename.option_value)
            setSiteDesc(res.data.sitedescription.option_value)
        })
    }, [])

    const saveSettings = () => {
        const key = 'updatable';
        message.loading({ content: 'Loading...', key });
        axios({
            method: 'post',
            url: `/admin/api/global/save`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: {
                siteurl: siteUrl,
                home: homeUrl,
                admin_home: aminUrl,
                sitename: siteName,
                sitedescription: siteDesc,
            }
        }).then(res => {
            if (!res.data.error) {
                message.success({ content: res.data.message, key, duration: 2 });
            } else {

            }
        })
    }

    return (
        <Card>
            <div>
                Site url: <Input value={siteUrl} onChange={(e) => { setSiteUrl(e.target.value); setSave(true) }} />
            Home url: <Input value={homeUrl} onChange={(e) => { setHomeUrl(e.target.value); setSave(true) }} />
            Admin url: <Input value={aminUrl} onChange={(e) => { setAminUrl(e.target.value); setSave(true) }} />
            Site Name: <Input value={siteName} onChange={(e) => { setSiteName(e.target.value); setSave(true) }} />
            Site description: <TextArea value={siteDesc} onChange={(e) => { setSiteDesc(e.target.value); setSave(true) }} />
            </div>
            {save && <Button onClick={saveSettings} >Save</Button>}
        </Card>
    )
}
