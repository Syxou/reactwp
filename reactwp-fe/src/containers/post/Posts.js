import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import Listing from '../../compontnts/listing/Listing'
import { getPostByType } from '../../actions/postAction'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import Filters from '../../compontnts/filter/Filter'


class Post extends Component {

    componentDidMount() {
        this.props.dispatch(getPostByType(this.props.match.params.name));
    }

    render() {
        const pageItems = this.props.posts.length ? this.props.posts.map((page, i) => {
            return (
                <Listing key={i}
                    data={page}
                    name={page.title}
                    status={page.state}
                    link={`/admin/post/${this.props.match.params.name}/${page.id}`}
                    textLink={"Edit"}
                />
            )
        }) : 'Sorry, no pages.'

        return (
            <>
                <div>
                    <h1>{this.props.match.params.name}</h1>
                    <div>
                        <div className="cardList">
                            {pageItems}
                        </div>
                    </div>
                </div>

                <Sidebare>
                    <Link to="/admin/new/page">
                        <Button type="primary">New Page</Button>
                    </Link>
                </Sidebare>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps)(Post);