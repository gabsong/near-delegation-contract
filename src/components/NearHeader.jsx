import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Menu, Avatar, Button, Typography } from 'antd';
import { AuthConsumer } from '../context/Auth';
import nearlogo from '../assets/gray_near_logo.svg';
const { Item, ItemGroup, SubMenu, Divider } = Menu;
const { Text, Title, Paragraph } = Typography;

export default function NearHeader (props) {
  const { title, login, requestSignIn } = props;
  return (
    <AuthConsumer>
      {({ login, signIn, signOut }) => (
        <div className="header flex space-between align-center">
          <div className="flex flex-start align-center">
            <img className="logo" src={nearlogo} alt="NEAR logo" />
      <h2>Staking Rewards</h2>
          </div>
          <div className="flex flex-end align-center">
            {login &&
              <React.Fragment>
                <Button type="link">My Dashboard</Button>
                <Menu>
                  <SubMenu>
                    <Item>
                      Settings
                    </Item>
                    <Item>
                      Switch Accounts
                    </Item>
                    <Item>
                      Logout
                    </Item>
                  </SubMenu>
                </Menu>
              </React.Fragment>
            }
            {!login &&
              <Button 
                id="login"
                type="primary"
                size="large"
                onClick={signIn}
              >
                Login with NEAR
              </Button>
            }
          </div>
        </div>
      )}
    </AuthConsumer>
  );
}