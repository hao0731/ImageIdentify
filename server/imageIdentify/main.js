const convnetjs = require('convnetjs')
const jimp = require('jimp')
const loadNetwork = require('./lib/loadNetJson')
const identify = require('./lib/identify')
const sample = require('./lib/sample')
const pretrainedNetwork = require('./network/cifar10_snapshot.json')
const classes = ['airplane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

const imageIdentify = async (image) => {
    const img = await jimp.read(image)
    const resizeImg = img.resize(32, 32)
    const imgData = sample(resizeImg.bitmap) 
    const net = loadNetwork(pretrainedNetwork) 
    const ans = identify(net, imgData)
    return classes[ans];
}

module.exports = imageIdentify;