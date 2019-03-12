
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
let errorNumber = 0
let errorNum = 0

const sagaOne = autoRestart(function* sagaOne() {
    yield delay(1000)
    if (errorNumber < 5) {
        errorNumber++
        yield put(sagaOneMessage(`Error Number ${errorNumber}`))
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
    if (errorNum < 10) {
        errorNum++
        yield put(sagaThreeMessage(`Error Number ${errorNum}`))
        throw new Error('Saga One Failed to Do a Thing')
    }
    yield put(sagaThreeMessage('Saga Three message'))

    // yield delay(1000)
    // if (errorNum < 10) {
    //     errorNum++;
    //     yield put(sagaThreeMessage(`Saga Three Fail ${errorNumber}`))
    //     throw new Error('Saga Three Failed to Do a Thing')
    // }
    // yield put(sagaThreeMessage('Success'))
    // yield delay(1000)
    // yield put(sagaThreeMessage)
}, console.error)


export function* loadHome() {
    yield fork(sagaOne)
    yield fork(sagaTwo)
    yield fork(sagaThree)
}
