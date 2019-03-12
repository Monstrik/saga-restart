
import React from 'react'
import {connect} from 'react-redux'

import {
    getSagaOneMessage,
    getSagaTwoMessage,
    getSagaThreeMessage
    } from 'selectors'

const mapStateToProps = state => ({
  sagaOneMessage: getSagaOneMessage(state),
  sagaTwoMessage: getSagaTwoMessage(state),
  sagaThreeMessage: getSagaThreeMessage(state),
})

export const Container = ({sagaOneMessage, sagaTwoMessage,sagaThreeMessage}) => (
  <div>
    <p>Saga One: {sagaOneMessage}</p>
    <p>Saga Two: {sagaTwoMessage}</p>
    <p>Saga Three: {sagaThreeMessage}</p>
  </div>
)

export const Home = connect(mapStateToProps)(Container)
