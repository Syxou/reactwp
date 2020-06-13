import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'antd';

import { fetchAllMedia } from '../../../actions/mediaAction'
import MediaItem from '../../media/MediaItem'


function ImageDrawer({ visible, closeCallblack, getMedia, media, urlCallback }) {

    useEffect(() => {
        getMedia()
    })

    return (
        <Drawer
            title="Images"
            placement="right"
            closable={false}
            onClose={() => closeCallblack()}
            visible={visible}
            getContainer={false}
            style={{ position: 'fixed', overflowY: 'scroll' }}
        >
            {
                media.media.map((m, i) => (
                    <MediaItem key={m.id} media={m} showSelect={true} selectCallback={(url => urlCallback(url))} />
                ))
            }
        </Drawer>
    )
}

const mapStateToProps = state => ({ media: state.media })

const mapDispatchToProps = dispatch => ({
    getMedia() {
        return dispatch(fetchAllMedia())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDrawer);
