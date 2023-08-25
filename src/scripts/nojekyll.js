const fs = require('fs-extra');
const path = require('path');

const base = path.resolve("");
fs.writeFileSync(`${base}/out/.nojekyll`, "");