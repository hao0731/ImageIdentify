const convnetjs = require('convnetjs')
module.exports = (img) => {
    let data = img.data
    let vol = new convnetjs.Vol(32, 32, 3, 0.0)
    for(let deep = 0;deep < 3;deep++) {
        let i = 0;
        for(let x = 0; x < 32;x++) {
            for(let y = 0; y < 32;y++) {
                let index = i * 4 + deep
                vol.set(y, x, deep, data[index] / 255.0 - 0.5)
                i++
            }
        }
    }
    return vol
}