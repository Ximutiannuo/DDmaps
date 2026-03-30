const fs = require('fs');

const data = fs.readFileSync('f:/map2/DDmaps-railway/js/traffic_system.js', 'utf8');
const lines = data.split('\n');

const out = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/\bfunction\s+[a-zA-Z0-9_]+/)) {
        out.push(`${i+1}: ${line.trim()}`);
    } else if (line.match(/\.innerHTML\s*=/)) {
        out.push(`${i+1} [HTML]: ${line.trim()}`);
    }
}

fs.writeFileSync('f:/map2/DDmaps-railway/js/funcs.txt', out.join('\n'));
console.log('Done');
