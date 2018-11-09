'use strict'

const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node-gpu')

const { dataSet } = require('./prepareData')

const NNModelService = require('./NNModelService')
const modelService = new NNModelService(tf)

async function training() {
  modelService.buildModel((model, _tf) => {
    model.add(_tf.layers.dense({ units: 27, activation: 'sigmoid', inputShape: [27] }))
    model.add(_tf.layers.dense({ units: 9, activation: 'sigmoid', inputShape: [9] }))
    model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' })

    return model
  })

  const { inputs, expected } = dataSet.createDataSetForXWins(3, 1)

  await modelService.learnModel(inputs, expected, 30)
  await modelService.saveModel(`file://${__dirname + '/../model'}`)

  const test = [[1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1]]

  const predictResult = await modelService.predict(test)

  console.log('Predict ceil: ', predictResult)
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
