'use strict'

const tf = require('@tensorflow/tfjs')

const { dataSet } = require('./prepareData')
// console.dir(dataSet.createDataSetFullHistory(3, 1))

async   function training() {
  const { inputs, expected } = dataSet.createDataSetFullHistory(3, 10)

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 27, activation: 'sigmoid', inputShape: [27] }))
  model.add(tf.layers.dense({ units: 9, activation: 'sigmoid' }))
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid', inputShape: [9] }))

  model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' })

  // console.dir(inputs)
  // console.dir(expected)

  const training_data = tf.tensor(inputs)

  const target_data = tf.tensor2d(expected, [expected.length, 1])

  for (let i = 1; i < 10; ++i) {
    var h = await model.fit(training_data, target_data, { epochs: 30 })
    console.log('Loss after Epoch ' + i + ' : ' + h.history.loss[0])
  }

  model.predict(training_data).print()
}

training()

// async function go() {

// const model = tf.sequential();
// model.add(tf.layers.dense({units: 10, activation: 'sigmoid',inputShape: [2]}));
// model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

// model.compile({loss: 'meanSquaredError', optimizer: 'rmsprop'});

// const training_data = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]]);
// const target_data = tf.tensor2d([[0],[1],[1],[0]]);

// for (let i = 1; i < 100 ; ++i) {
//  var h = await model.fit(training_data, target_data, {epochs: 30});
//    console.log("Loss after Epoch " + i + " : " + h.history.loss[0]);
// }

//  model.predict(training_data).print();

// }

// go();
