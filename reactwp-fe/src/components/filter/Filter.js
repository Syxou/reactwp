import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd';
import { filterPages } from '../../actions/actions'

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
        }
    }

    hendleDropDown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }
    hendleClickFilter = (e) => {
        this.props.dispatch(filterPages(this.props.filterBy, e.target.value))

    }

    /**
     *  !TODO По клику на  li кабек в редукс  filterPages(pages, filterItem, filterBy) 
     */

    render() {

        let dropdown
        dropdown = !this.state.dropdown ||
            <FilterDropDown>
                <FilterList> {
                    this.props.filterItems.map((e, i) => (
                        <li key={i}>
                            <FilterItems onClick={this.hendleClickFilter} value={e} >{e}</FilterItems>
                        </li>
                    ))
                }</FilterList>
            </FilterDropDown>

        console.log()
        return (
            <FilterWrap>
                <FilterButtonWrap>
                    <span>Filter stats</span>
                    <FilterButton onClick={this.hendleDropDown} >  <Icon type="filter" style={{ fontSize: '20px', color: '#B8C5D3' }} /></FilterButton>
                    {dropdown}
                </FilterButtonWrap>
                <>
                    {this.props.children}
                </>

            </FilterWrap >
        )
    }
}


const onset = keyframes`
  from {
    border-radius: 50px;
    opacity: 0
  }

  to {
    border-radius: 4px;
    opacity: 1
  }
`;

const FilterButton = styled.button`

    background: #FFFFFF;
    box-shadow: 0px 1px 4px #E5E9F2;
    border-radius: 5px;
    width: 40px;
    height:40px;
    padding: 0;
    margin-left: 10px;
`
const FilterDropDown = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 1px 4px #E5E9F2;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    margin-top: 10px;
    right: 0;
    animation: ${onset} 0.3s;
`
const FilterButtonWrap = styled.div`
    position: absolute;
    right: 0;
`
const FilterWrap = styled.div`
    position: relative;
    margin-top: 10px;
`

const FilterItems = styled.button`
    background: none;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);
    padding: 4px;
    width: 100%;
`

const FilterList = styled.ul`
    padding: 0 10px;
    li{
        list-style: none;
        margin: 5px 0px;    
    }
`


export default connect()(Filter)
