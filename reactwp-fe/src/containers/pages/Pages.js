import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import Listing from '../../compontnts/listing/Listing'
import { fetchPages } from '../../actions/actions'
import Sidebare from '../../compontnts/sidebar/Sidebar'
import './Pages.css';

class Pages extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPages());
    }

    render() {
        const pageItems = this.props.pages.map((page, i) => {
            return (<Listing key={i}
                data={page}
                name={page.title}
                status={page.state}
                link={`/admin/pages/${page.id}`}
                textLink={"Edit"}
            />);
        });
        return (
            <>
                <div>
                    <h2>Pages</h2>
                    <div>
                        <div className="cardList">
                            {this.props.pages ? pageItems : 'pageItems'}
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