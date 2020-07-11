import React, { useEffect, } from 'react'
import { connect } from 'react-redux'
import { fetchAllMedia } from '../../actions/mediaAction'
import UploadMedia from './UploadMedia'
import styled from 'styled-components'
import Card from '../../components/card/Card'
import MediaItem from './MediaItem'


const useFetching = someFetchActionCreator => {
    useEffect(() => {
        someFetchActionCreator();
    }, [someFetchActionCreator])
}

function Meida({ media, getMedia }) {
    useFetching(getMedia)

    return (
        <Wrap>
            <h2>Media</h2>
            <div>
                <UploadMedia />
            </div>
            <div>
                <Card>
                    <Gallery id="gallery">
                        {
                            media.media.map((m, i) => (
                                <MediaItem key={m.id} media={m} />
                            ))
                        }
                    </Gallery>
                </Card>
            </div>

        </Wrap>
    )
}

const Gallery = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat( 5, minmax(100px, 500px) );
    grid-template-rows: 1fr 1fr 1fr;
    gap: 15px;
  
`

const Wrap = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
`


const mapDispatchToProps = (dispatch) => ({
    getMedia() {
        return dispatch(fetchAllMedia())
    }
})

const mapStateToProps = (state) => {
    return ({
        media: state.media
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Meida)