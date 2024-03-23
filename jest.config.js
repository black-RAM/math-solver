module.exports = {
  testEnvironment: "jsdom", // allow for DOM-related code
  transform: {
    "^.+\\.js$": "babel-jest" // allow for ES6 imports
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy' // allow for css asset import
  }
}