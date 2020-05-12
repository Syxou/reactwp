import React, { Component } from 'react';
import axios from "axios"
import Cookies from 'js-cookie'

import { Transfer, Switch, Table, Tag, Button, Icon } from 'antd';
import difference from 'lodash/difference';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false} rowKey={record => record.id}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ id }) => id);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ id }, selected) {
                    onItemSelect(id, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowKey="id"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                    onRow={({ id, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(id, !listSelectedKeys.includes(id));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);



/**
 *         key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: mockTags[i % 3],
 */

// const originTargetKeys = mockData.filter(item => +item.id % 3 > 1).map(item => item.id);

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'type',
        title: 'Type',
        render: type => <Tag>{type}</Tag>,
    },
    {
        dataIndex: 'slug',
        title: 'Slug',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'type',
        title: 'Type',
        render: type => <Tag>{type}</Tag>,
    },
    {
        dataIndex: 'slug',
        title: 'Slug',
    },
];

class RcfPagesSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetKeys: this.props.selectPages.map(item => item.id),
            trueKeys: this.props.selectPages.map(item => item.id),
            showSave: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const originTargetKeys = nextProps.selectPages.map(item => item.id);
        this.setState({ targetKeys: originTargetKeys, trueKeys: originTargetKeys });
    }

    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys, showSave: JSON.stringify(this.state.trueKeys) !== JSON.stringify(nextTargetKeys) });
    };

    savePosts = async () => {
        console.log("save", { pages: this.state.targetKeys })

        await axios({
            method: "post",
            url: `/admin/api/fields/schema/${this.props.idScnema}/add/pages`,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
            },
            data: {
                pages: this.state.targetKeys
            }
        })
            .then(res => {
                const { data } = res;
                console.log(data)
            })
    }

    render() {
        const { allPages } = this.props
        const { targetKeys, showSave } = this.state
        return (
            <div>
                <TableTransfer
                    dataSource={allPages}
                    targetKeys={targetKeys}
                    showSearch={true}
                    onChange={this.onChange}
                    filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.type.indexOf(inputValue) !== -1
                    }
                    leftColumns={leftTableColumns}
                    rightColumns={rightTableColumns}
                />
                {showSave && <Button onClick={this.savePosts}>Save</Button>}
            </div>
        );
    }
}

export default RcfPagesSelect;