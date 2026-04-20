class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = 'assets/logoAnimation/';
        for (let i = 1; i <=34; i++){
            this.load.image("logo-" + i, "logo-" + i + ".png");
        }
        this.load.path = 'assets/images/';
        this.load.image('rain', 'rain.png');

        this.load.path = 'assets/sounds/';
        this.load.audio('pop', 'pop.mp3');
        this.load.audio('bell', 'bell.mp3');
    }
    create(){
        //sets screen center
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        //create animation frames for logo animation
        let frameNames = [];
        for (let i = 1; i <= 34; i++){
            frameNames.push({key: "logo-" + i});
        }

        this.anims.create({
            key: "logoAnim",
            frames: frameNames,
            frameRate: 10,
            repeat: 0
        });

        let logo = this.add.sprite(centerX-10, centerY, "logo-1");
        logo.setScale(0.28);
        logo.setDepth(10);
        logo.play("logoAnim");

        // Play sounds during animation
        logo.on('animationupdate', (animation, frame) => {
            if (frame.index === 15) {
                this.sound.play('pop');
            }
            if (frame.index === 29) {
                this.sound.play('pop');
            }
        });

        //when the logo animation is done, add in text to move onto next scene
        logo.on("animationcomplete", () => {
            let nextScene = this.add.text(centerX, centerY + 255, "click to continue (๑>◡<๑)", {
                fontSize: "25px",
                color: "#ffffff",
            });
            this.sound.play('bell');
            nextScene.setOrigin(0.5);
            this.input.once("pointerdown", () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.on("camerafadeoutcomplete", () => {
                    this.scene.start("outside");
                });
            });
        });

        //create window background and frame
        const windowFrame = this.add.rectangle(centerX, centerY, 650, 450, 0xffffff);
        const windowBackground = this.add.rectangle(centerX, centerY, 620, 420, 0x1F2647, 0.8);

        // Draw window panes
        this.pane = this.add.graphics();
        this.pane.setDepth(5);
        this.pane.lineStyle(10, 0xffffff);

        this.pane.lineBetween(centerX - 155, centerY - 210, centerX - 155, centerY + 210);
        this.pane.lineBetween(centerX + 155, centerY - 210, centerX + 155, centerY + 210);

        this.pane.lineBetween(centerX - 310, centerY - 105, centerX + 310, centerY - 105);
        this.pane.lineBetween(centerX - 310, centerY + 105, centerX + 310, centerY + 105);

    }
    update(){
    
    }
}

class Outside extends Phaser.Scene {
    constructor() {
        super('outside');
    }
    preload(){
        this.load.path = 'assets/images/';
        this.load.image('Coffee_and_Tea_Shop', 'Coffee_and_Tea_Shop.jpg');

        this.load.path = 'assets/sounds/';
        this.load.audio('rain', 'rain.mp3');
    }
    create(){
        this.cameras.main.setBackgroundColor('#ACBDAD');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;


        this.add.image(575, centerY, 'Coffee_and_Tea_Shop').setScale(0.82);
        let text1 = this.add.text(20, centerY - 170, "It’s a quiet, cozy evening. Rain falls gently against the window of the local cafe. You decide to enter to get a warm drink.",{
            fontSize: "20px",
            color: "#000000",
            wordWrap: { width: 230 },
            align: 'center'
        });

        let cafeButton = this.add.ellipse(135, centerY + 100, 230, 60, 0xBDACBC).setInteractive();
        let buttonText = this.add.text(135, centerY + 100, "Enter the cafe", {
            fontSize: "20px",
            color: "#000000"
        }).setOrigin(0.5);

        cafeButton.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.on("camerafadeoutcomplete", () => {
                this.sound.stopByKey('rain');
                this.scene.start("inside");
            });
        });

        this.sound.play('rain', { loop: true, volume: 0.5 });


    }
    update(){
    
    }
}

class Inside extends Phaser.Scene {
    constructor() {
        super('inside');
    }
    preload(){
        this.load.path = 'assets/images/';
        this.load.image('cafeInside', 'cafeInside.jpg');

        this.load.path = 'assets/sounds/';
        this.load.audio('cafeMusic', 'cafeMusic.mp3');
    }
    create(){
        this.graphics = this.add.graphics();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.cameras.main.setBackgroundColor('#000000'); 
        this.add.image(centerX, centerY, 'cafeInside').setScale(0.8);

        this.sound.play('cafeMusic', { loop: true, volume: 0.5 });



    }
    update(){
    
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }
    preload(){
        this.load.path = 'assets/';
    }
    create(){
        this.cameras.main.setBackgroundColor('#ffffff');
        this.graphics = this.add.graphics();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    }
    update(){
    
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    preload(){
        this.load.path = 'assets/';
    }
    create(){
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    }
    update(){
    
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: "#88A4CF",
    scene: [Intro, Outside, Inside, Menu, Credits]
}

let game = new Phaser.Game(config);