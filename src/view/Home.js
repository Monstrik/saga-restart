
import React from 'react'
import {connect} from 'react-redux'

import {getSagaOneMessage, getSagaTwoMessage} from 'selectors'

const mapStateToProps = state => ({
  sagaOneMessage: getSagaOneMessage(state),
  sagaTwoMessage: getSagaTwoMessage(state)
})

export const Container = ({sagaOneMessage, sagaTwoMessage}) => (
  <div>
    <p>Saga One: {sagaOneMessage}</p>
    <p>Saga Two: {sagaTwoMessage}</p>
  </div>
)

export const Home = connect(mapStateToProps)(Container)
