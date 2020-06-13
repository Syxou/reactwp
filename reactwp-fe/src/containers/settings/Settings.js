import React, { Component } from 'react';
import { Tabs } from 'antd';

import Menu from './Menu'
import GlobalSettings from './GlobalSettings'
import CustomPost from './CustomPost'

const { TabPane } = Tabs;

class Settings extends Component {
    render() {
        return (
            <div>
                <h1>Settings</h1>
                <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: '90vh' }}>
                    <TabPane tab="Menu" key="1">
                        <Menu />
                    </TabPane>
                    <TabPane tab="Global Settings" key="2">
                        <GlobalSettings />
                    </TabPane>
                    <TabPane tab="Custom Post" key="3">
                        <CustomPost />
                    </TabPane>
                </Tabs>
            </div>

        );
    }
}

export default Settings;