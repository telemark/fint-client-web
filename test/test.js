const test = require('ava')
const { dependencies, devDependencies } = require('../package.json')
const dropModules = ['react-json-view']
const isDropped = module => !dropModules.includes(module)

Object.keys(dependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})

Object.keys(devDependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})
