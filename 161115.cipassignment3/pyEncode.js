const pyEncode = py => {
    let first = [null, 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'];
    let last = [undefined, 'a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'i', 'ia', 'ie', 'iao', 'iou', 'ian', 'ian', 'ian', 'in', 'iang', 'ing', 'iong', 'u', 'ua', 'uo', 'uai', 'uei', 'uan', 'uen', 'uang', 'ueng', 'v', 've', 'van', 'vn'];
    let pre, post;
    if (py.length === 1) {
        pre = 0;
        post = last.indexOf(py)
    }else{
        let assume = py.slice(0,2);
        let i = first.indexOf(assume);
        if (i>=0){
            pre = i;
            post = last.indexOf(py.slice(2));
        }else{
            pre = first.indexOf(py[0]);
            post = last.indexOf(py.slice(1));
        }
    }
    return Buffer.from([pre, post]);
};

module.exports = pyEncode;