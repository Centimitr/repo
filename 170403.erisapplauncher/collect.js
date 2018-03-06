const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const FROM_STR = `<script type="text/javascript" src="inline.bundle.js"></script><script type="text/javascript" src="polyfills.bundle.js"></script><script type="text/javascript" src="styles.bundle.js"></script><script type="text/javascript" src="vendor.bundle.js"></script><script type="text/javascript" src="main.bundle.js"></script>`;
const TO_STR = `
<script>
    require('./inline.bundle.js');
    require('./polyfills.bundle.js');
    require('./styles.bundle.js');
    require('./vendor.bundle.js');
    require('./main.bundle.js');
</script>
`;

// copy
const PATH = '/Users/shixiao/go/src/erisapp.com/erisapp.com';
exec(`cp ${PATH} ./"Eris Support"`);
exec(`rm ${PATH}`);
exec('cp -r ../viewer/dist/ ./app/');

// modify
const p = path.join(__dirname, 'app', 'index.html');
const text = fs.readFileSync(p).toString();
fs.writeFileSync(p, text.replace(FROM_STR, TO_STR));
