import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NearHeader from './components/NearHeader';
import MainContent from './components/MainContent';
import NearFooter from './components/NearFooter';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import data from './data';
import './App.css';
const { Content, Footer } = Layout;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false,
      signIn: () => {
        console.log('setState invoked, signIn', this);
        this.setState(({ login }) => {
          if (!login) {
            return ({ login: true })
          }
        });
      },
      signOut: () => {
        console.log(this);
        this.setState(({ login }) => {
          console.log('setState invoked, signOut', this);
          if (login) {
            return ({ login: false })
          }
        });
      },
      loading: true,
      validators: data,
      route: 'validators'
    };

    // this bindings
    this.requestSignIn = this.requestSignIn.bind(this);
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
  }

  // componentDidMount
  componentDidMount () {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  // class methods
  async requestSignIn () {
    const appTitle = 'NEAR Delegator';
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  async signedInFlow () {
    console.log(this);
    this.state.signIn();
    const accountId = await this.props.wallet.getAccountId()
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
  }

  requestSignOut () {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn())
  }

  signedOutFlow () {
    console.log(this);
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    this.state.signOut();
  }

  render () {
    const { login, validators } = this.state;
    
    return (
      <Layout>
        <NearHeader 
          title="Staking Rewards"
          login={login}
          requestSignIn={this.requestSignIn}
          requestSignOut={this.requestSignOut}
        />
        <Content className="flex flex-center content">
          <div className="desktop">
            <MainContent
              login={login}
              validators={validators}
            />
          </div>
        </Content>
        <Footer>
          <NearFooter />
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  contract: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired
};
