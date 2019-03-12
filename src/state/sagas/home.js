
import { delay } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'

import { addMessage } from 'actions'

const sagaOneMessage = value => addMessage({
    key: 'sagaOne',
    value
})

const sagaTwoMessage = addMessage({
    key: 'sagaTwo',
    value: 'Saga Two message'
})

const sagaThreeMessage = value => addMessage({
    key: 'sagaThree',
    value
})

const sagaFourMessage = value => addMessage({
    key: 'sagaFour',
    value
})

const autoRestart = (generator, handleError) => {
    return function* autoRestarting(...args) {
        while (true) {
            try {
                yield call(generator, ...args)
                break
            } catch (e) {
                yield handleError(e)
            }
        }
    }
}

// Terribad dummy code to test PoC.
let error1Num = 0
let error3Num = 0
let error4Num = 0

const sagaOne = autoRestart(function* sagaOne() {
    yield delay(1000)
    if (error1Num < 5) {
        error1Num++
        yield put(sagaOneMessage(`Error Number ${error1Num}`))
        throw new Error('Saga One Failed to Do a Thing')
    }
    yield put(sagaOneMessage('Saga One message'))
}, console.error)

const sagaTwo = autoRestart(function* sagaTwo() {
    yield delay(3000)
    yield put(sagaTwoMessage)
}, console.error)

const sagaThree = autoRestart(function* sagaThree() {
    yield delay(500)
    if (error3Num < 10) {
        error3Num++
        yield put(sagaThreeMessage(`Error Number ${error3Num}`))
        throw new Error('Saga Three Failed to Do a Thing')
    }
    yield put(sagaThreeMessage('Saga Three message'))
}, console.error)

const sagaFour = autoRestart(function* sagaFour() {

    yield delay(120)
    if (error4Num < 50) {
        error4Num++
        yield put(sagaFourMessage(`Error Number ${error4Num}`))
        throw new Error('Saga Four Failed to Do a Thing')
    }
    yield put(sagaFourMessage('Saga Four message'))
}, console.error)


export function* loadHome() {
    yield fork(sagaOne)
    yield fork(sagaTwo)
    yield fork(sagaThree)
    yield fork(sagaFour)

}
