var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.appendChild(document.createTextNode('.myFocus {box-shadow: inset 0 0 0 1px #f00}'));

document.head.appendChild(styleEl);

var lastEl = null;
document.addEventListener('mouseover', (event) => {
    if (event.target !== lastEl) {
        lastEl && (lastEl.classList.remove('myFocus'));
        event.target.classList.add('myFocus');
        lastEl = event.target;
    }
});

document.addEventListener('click', (event) => {
    var selector = getSelector(event.target);
    copyToClipboard(selector);
    window.prompt("Selector copied to clipboard:", selector);
});

function getSelector(element) {
    if (!element) return null;
    var path = [];
    while (element.parentNode) {
        var part = element.nodeName;
        if (element.id) {
            part += '#' + element.id;
            path.unshift(part);
            break;
        } else {
            var siblings = element.parentNode.children;
            if (siblings.length > 1) {
                var index = Array.prototype.indexOf.call(siblings, element);
                part += ':nth-child(' + (index + 1) + ')';
            }
        }
        path.unshift(part);
        element = element.parentNode;
    }
    return path.join(' > ');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Selector copied to clipboard:', text);
        })
        .catch(err => {
            console.error('Failed to copy selector to clipboard:', err);
        });
}