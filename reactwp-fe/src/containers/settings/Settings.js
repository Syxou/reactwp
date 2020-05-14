import React, { Component } from 'react';
import { Tabs, Radio } from 'antd';


import Menu from './Menu'
import GlobalSettings from './GlobalSettings'

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

                </Tabs>
            </div>

        );
    }
}

export default Settings;