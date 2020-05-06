import React from 'react'
import Cookies from 'js-cookie'

import { Upload, Icon, message } from 'antd';
const { Dragger } = Upload;

export default function Meida() {
    const props = {
        name: 'file',
        multiple: true,
        method: 'post',
        action: '/admin/api/media/upload',
        name: 'Files',
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token'),
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <>
            <div>
                <h2>Media</h2>
                <div>

                </div>
            </div>
            <div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
        </>
    )
}
