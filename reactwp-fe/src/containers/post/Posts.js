import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import Listing from '../../components/listing/Listing'
import { getPostByType } from '../../actions/postAction'
import Sidebare from '../../components/sidebar/Sidebar'
// import Filters from '../../components/filter/Filter'


class Posts extends Component {

    componentDidMount() {
        console.log('mount')
        this.props.dispatch(getPostByType(this.props.match.params.name));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.name !== prevProps.match.params.name) {
            this.props.dispatch(getPostByType(this.props.match.params.name));
        }
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
                            {pageItems}
                    </div>
                </div>

                <Sidebare>
                    <Link to={`/admin/post/new/${this.props.match.params.name}`}>
                        <Button type="primary">New {this.props.match.params.name}</Button>
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

export default connect(mapStateToProps)(Posts);
