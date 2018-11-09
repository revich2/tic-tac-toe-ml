'use strict'

const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node-gpu')

const { dataSet } = require('./prepareData')

const orderBy = require('lodash/orderBy')

async function training() {
  const { inputs, expected } = dataSet.createDataSetForXWinsChangedExpected2(3, 1)

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 27, activation: 'sigmoid', inputShape: [27] }))
  model.add(tf.layers.dense({ units: 9, activation: 'sigmoid', inputShape: [9] }))

  model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' })

  const training_data = tf.tensor(inputs, [inputs.length, 27])

  const target_data = tf.tensor(expected)

  console.log(inputs)
  console.log(expected)

  // for(let i = 0; i < 30; i++) {
  //   var h = await model.fit(training_data, target_data, { epochs: 30 })

  //   console.log(h.history.loss[0])
  // }

  // await model.save(`file://${__dirname + '/../model'}`);

  // const test = [
  //   [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  //   [1,0,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,1,0,0],
  // ]
  // const _test = tf.tensor(test)

  // model.predict(_test).print()
}

training()

// async function testLoad() {
//   const model = await tf.loadModel(`file://${__dirname + '/../model/model.json'}`)

//   const test = [[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1]]
//   const _test = tf.tensor(test)

//   const resultData = await model.predict(_test).data()

//   const trasformData = Array.from(resultData).map((value, index) => ({
//     value,
//     ceil: index,
//   }))

//   const orderedData = orderBy(trasformData, ['value'], ['desc'])

//   console.log('result', orderedData)
// }

// testLoad()
