const { VM } = require('vm2');

const vm = new VM({
    timeout: 1000
});

exports.run = (code) => vm.run(code);