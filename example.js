exports.handler = async(event, context) => {
  console.log(`Example Node.js ${process.version} on Lambda!`)
  console.log(`There is ${context.getRemainingTimeInMillis()}ms remaining`)
  return event
}

