import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import Listing from '../../components/listing/Listing'
import { fetchPages } from '../../actions/actions'
import Sidebare from '../../components/sidebar/Sidebar'
import Filters from '../../components/filter/Filter'
import './Pages.css';

class Pages extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPages('status'));
    }

    render() {
        const pageItems = this.props.pages.length ? this.props.pages.map((page, i) => {
            return (<Listing key={i}
                data={page}
                name={page.title}
                status={page.state}
                link={`/admin/pages/${page.id}`}
                textLink={"Edit"}
            />)
        }) : 'Sorry, no pages.'

        return (
            <>
                <div>
                    <Filters filterItems={['publish', 'trash', 'draft', 'all']} filterBy="state" />
                    <h1>Pages</h1>
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
        pages: state.pages.pages
    }
}

export default connect(mapStateToProps)(Pages);