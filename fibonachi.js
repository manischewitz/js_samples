function calcFib(x) {
    if (x > 1) {
        return calcFib(x - 1) + calcFib(x - 2);
    } else {
        return x;
    }
}

onmessage = function () {
    for (var i = 0; i < 500; i++) {
        console.time(i);
        postMessage(i + " = " + calcFib(i));
        console.timeEnd(i);
    }
}