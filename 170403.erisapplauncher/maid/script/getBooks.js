module.exports = function () {
    const removeSurround = function (node, direction) {
        const removeSiblings = function (node, direction) {
            const getNext = () => direction ? node.previousSibling : node.nextSibling;
            let next = getNext();
            while (next) {
                node.parentNode.removeChild(next);
                next = getNext();
            }
        };
        const everyAncestor = function (node, fn) {
            let parent = node.parentElement;
            while (parent) {
                fn(parent);
                parent = parent.parentElement;
            }
        };
        removeSiblings(node, direction);
        everyAncestor(node, node => removeSiblings(node, direction));
    };
    const toArray = function (nodeList) {
        return Array.prototype.slice.call(nodeList);
    };
    const all = toArray(document.querySelectorAll('body *'));
    const cut = all.filter(elm => elm.innerText.includes('全部章节列表')).pop();
    removeSurround(cut, true);
    return toArray(document.querySelectorAll('a.tg'))
        .map(a => [
            a.href,
            a.innerText,
            parseInt(a.nextSibling.textContent.match(/-?[1-9]\d*/).shift())
        ])
};