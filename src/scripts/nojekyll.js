import fs from 'fs-extra'
import path from 'path'

const base = path.resolve("");
fs.writeFileSync(`${base}/out/.nojekyll`, "");