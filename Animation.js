function Animation(id , fps, urls) {

    this.imageId = id;
    this.fps = 1000 / fps;
    this.imgElement = null;
    this.frames = new Array(urls.length);

    this.loadedFrames = 0;
    this.isLoaded = false;
    this.currentFrame = -1;
    this.timer = null;
    this.startOnLoad = false;

    var object = this;

    for (var i = 0; i < urls.length;i++){
        this.frames[i] = new Image();
        this.frames[i].onload = countLoaded;
        this.frames[i].src = urls[i];
    }

    function countLoaded() {
        object.loadedFrames++;
        if (object.loadedFrames == urls.length) {
            object.isLoaded = true;
            if (object.startOnLoad) object.start();
        }
    }

    this._nextFrame = function () {
        object.currentFrame = (object.currentFrame + 1) % object.frames.length;
        object.imgElement.src = object.frames[object.currentFrame].src;
    }
}

Animation.prototype.start = function () {
    if (this.timer) return;

    if (!this.isLoaded) { //if timer does not exist and images are not loaded
        this.startOnLoad = true;
    } else {
        if (!this.imgElement) this.imgElement = document.getElementById(this.imageId);
        this._nextFrame();
        this.timer = window.setInterval(this._nextFrame,this.fps);
    }
}

Animation.prototype.stop = function () {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
}
