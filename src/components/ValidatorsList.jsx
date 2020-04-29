import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from './Text'
import Flag from 'react-world-flags';
import { List, Avatar, Typography, Button, Space } from 'antd';
import { AuthConsumer } from '../context/Auth';
const { Item } = List;
const { Meta } = Item;
const { Title } = Typography;

export default function ValidatorsList ({ validators }) {
  return (
    <AuthConsumer>
      {({ login, loginToggle }) => (
        <List header="Validators">
          {validators.map((validator) => (
            <Item className="list-item" key={validator.account}>
              <Space size={19} direction="horizontal" className="flex align-center">
                <Avatar shape="square" size={90}></Avatar>
                <div>
                  <Text className="subheader-md">{validator.name}</Text>
                  <Text className="description text">{validator.description}<span><a href="_blank"> Learn More</a></span></Text>
                </div>
                <Flag 
                  code={validator.country} 
                  width="72" 
                />
                <Text className="near-label" style={{ width: '120px' }}>
                  <Text className="subheader-lg">
                    {`${validator.fees_lower/10000} - ${validator.fees_upper/10000} %`}
                  </Text>
                  FEES
                </Text>
                {login
                ? <Button className="btn-custom" size="large">
                  Stake Now
                </Button>
                : <Button className="btn-custom" size="large" disabled>
                  Login to Stake
                </Button>}
              </Space>
            </Item>
          ))}
        </List>
      )}
    </AuthConsumer>
  )
};