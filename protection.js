document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'i') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'j') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

setInterval(function() {
    console.clear();
}, 100);

console.log('%c⚠️ PERINGATAN!', 'color: red; font-size: 40px; font-weight: bold;');
