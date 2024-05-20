import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background').setOrigin(0.5).setDepth(1);

        this.logo = this.add.image(280, 100, 'logo').setDepth(10).setDisplaySize(200, 200);


        let PlayButton = this.title = this.add.text(280, 230, 'Igraj', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        let scoreboard = this.title = this.add.text(280, 280, 'Lestvica', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);


        let HoverSprite = this.add.sprite(100, 100, "chicken", 0).setDepth(1);
        HoverSprite.setScale(2);
        HoverSprite.setVisible(false);
        
        this.sound.play("menuaudio", {
            loop:true
        })

        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [0,1,2,3]
            })
        })

        PlayButton.setInteractive();
 
        PlayButton.on("pointerover", () =>{
            HoverSprite.setVisible(true);
            HoverSprite.play("walk");
            HoverSprite.x = PlayButton.x + PlayButton.width;
            HoverSprite.y = PlayButton.y
        });
        PlayButton.on("pointerout", () =>{
            HoverSprite.setVisible(false);

        });
        PlayButton.on("pointerup", () =>{
            
            this.scene.start("Game");
        });
        
        scoreboard.setInteractive();

        scoreboard.on('pointerover', () => {
            HoverSprite.setVisible(true);
            HoverSprite.play('chickendeath');
            HoverSprite.x = scoreboard.x + scoreboard.width ;
            HoverSprite.y = scoreboard.y;
        });

        scoreboard.on('pointerout', () => {
            HoverSprite.setVisible(false);
        });

        scoreboard.on('pointerup', () => {
            window.location.href = '/scoreboard';
        });

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {

        this.scene.start('Game');
    }
}
