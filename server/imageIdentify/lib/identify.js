const convnetjs = require('convnetjs');
module.exports = (net, imgData) => {
    net.forward(imgData)
    let ans = net.getPrediction()
    return ans
}