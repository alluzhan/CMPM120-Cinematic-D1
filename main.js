class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.preload.path = 'assets/';
    }
    create(){
        this.graphics = this.add.graphics();
    }
    update(){
    
    }
}

class Outside extends Phaser.Scene {
    constructor() {
        super('outside');
    }
    preload(){
        this.preload.path = 'assets/';
    }
    create(){
        this.graphics = this.add.graphics();
    }
    update(){
    
    }
}

class Inside extends Phaser.Scene {
    constructor() {
        super('inside');
    }
    preload(){
        this.preload.path = 'assets/';
    }
    create(){
        this.graphics = this.add.graphics();
    }
    update(){
    
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload(){
        this.preload.path = 'assets/';
    }
    create(){
        this.graphics = this.add.graphics();
    }
    update(){
    
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 700,
    backgroundColor: 0xF54927,
    scene: [Intro],
}

let game = new Phaser.Game(config);