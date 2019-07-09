const runSuite = () => {
  try {
    // Testing business logic of the module
    require('./lib/index.test')()
    require('./lib/utils.test')()
    require('./lib/format.test')()

    // Testing query language flavours
    require('./formats/mongo.test')()
    require('./formats/sequelize.test')()
    require('./formats/sql.test')()

    console.log('=> Test suite passed!')
  } catch (error) {
    console.log('=> Test suite failed with assertion:')
    console.error(error)
  }
}

runSuite()
