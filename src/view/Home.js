
import React from 'react'
import {connect} from 'react-redux'

import {
    getSagaOneMessage,
    getSagaTwoMessage,
    getSagaThreeMessage,
    getSagaFourMessage
    } from 'selectors'

const mapStateToProps = state => ({
  sagaOneMessage: getSagaOneMessage(state),
  sagaTwoMessage: getSagaTwoMessage(state),
  sagaThreeMessage: getSagaThreeMessage(state),
  sagaFourMessage: getSagaFourMessage(state),
})

export const Container = ({sagaOneMessage, sagaTwoMessage,sagaThreeMessage,sagaFourMessage}) => (
  <div>
    <p>Saga One: {sagaOneMessage}</p>
    <p>Saga Two: {sagaTwoMessage}</p>
    <p>Saga Three: {sagaThreeMessage}</p>
    <p>Saga Four: {sagaFourMessage}</p>

  </div>
)

export const Home = connect(mapStateToProps)(Container)
