const { VM } = require('vm2');

function createVM() {
	return new VM({
		timeout: 1000
	});
}

exports.createVM = createVM;
