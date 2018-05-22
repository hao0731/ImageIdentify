const convnetjs = require('convnetjs')
module.exports = (data) => {
    let net = new convnetjs.Net()
    net.fromJSON(data)
    return net
}