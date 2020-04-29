import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Text from './Text'

export default function NearFooter () {
  // dynamically-computed styles at render time
  // refactor to className for improved performance
  const styles = {
    fontSize: '14px'
  };

  return (
    <div className="flex space-between">
      <div className="flex flex-start align-center">
        <Text style={styles}>&#169; 2020 NEAR Inc.</Text>
        <Text className="separator" style={styles}>|</Text>
        <Text style={styles}>All Rights Reserved</Text>
      </div>
      <div className="flex flex-end align-center">
        <Text styles={styles}>
          <a href="https://near.org/privacy/">Terms &amp; Conditions</a>
        </Text>
        <Text className="separator" style={styles}>|</Text>
        <Text styles={styles}>
          <a href="https://near.chat/">Support</a>
        </Text>
        <Text className="separator" style={styles}>|</Text>
        <Text styles={styles}>
          <a href="_blank">Learn more about NEAR</a>
        </Text>
      </div>
    </div>
  )
};
