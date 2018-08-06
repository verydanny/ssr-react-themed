import React, { Component } from 'react'
import { PageView, Tagging } from '@rentpath/react-ui-tracking'
import { Layout } from 'ui/small/components/Layout'
import styles from './Error.css'

export default class NotFound extends Component {
  render() {
    return (
      <Layout>
        <PageView />
        <Tagging
          page="error"
        />
        <div className={styles.Error} data-tid="error-text">
          <h1>whoops</h1>
          <h2>(page not found)</h2>
        </div>
      </Layout>
    )
  }
}
