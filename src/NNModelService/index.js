'use strict'

const orderBy = require('lodash/orderBy')
class NNModelService {
  constructor(tf) {
    this.tf = tf
    this.model = null
  }

  getModel() {
    return this.model
  }

  buildModel(cb) {
    if (cb) {
      this.model = this.tf.sequential()

      const model = cb(this.model, this.tf)
      this.model = model
    } else {
      throw new Error('Expected return new model')
    }
  }

  async learnModel(trainingData, targetData, epochCount) {
    const trainingDataLength = trainingData.length

    const training_data = this.tf.tensor(trainingData, [trainingDataLength, 27])

    const target_data = this.tf.tensor(targetData)

    for (let i = 0; i < epochCount; i++) {
      var h = await this.model.fit(training_data, target_data, { epochs: 30 })

      console.log(h.history.loss[0])
    }
  }

  async saveModel(path) {
    await this.model.save(path)
  }

  async loadModel(path) {
    const model = await this.tf.loadModel(path)

    this.model = model
  }

  async predict(board) {
    const testData = await this.tf.tensor(board)

    const predictData = await this.model.predict(testData).data()

    const trasformData = Array.from(predictData).map((value, index) => ({
      value,
      ceil: index,
    }))

    const orderedData = orderBy(trasformData, ['value'], ['desc'])

    return orderedData[0].ceil
  }
}

module.exports = NNModelService
