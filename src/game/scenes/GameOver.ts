import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;
    playAgain: Phaser.GameObjects.Text;
    scoreboard: Phaser.GameObjects.Text;

    constructor() {
        super('GameOver');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameOverText = this.add.text(512, 384, 'Konec igre', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5).setDepth(100);

        let playAgain = this.playAgain = this.add.text(512, 450, 'Igraj ponovno', {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5).setDepth(100);

        let scoreboard = this.scoreboard = this.add.text(512, 500, 'Lestvica', {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5).setDepth(100);


        let HoverSprite = this.add.sprite(100, 100, 'chicken', 0).setDepth(1);
        HoverSprite.setScale(2);
        HoverSprite.setVisible(false);

        this.playAgain.setInteractive();

        playAgain.on('pointerover', () => {
            HoverSprite.setVisible(true);
            HoverSprite.play('chickendeath');
            HoverSprite.x = playAgain.x + playAgain.width - 90;
            HoverSprite.y = playAgain.y;
        });

        playAgain.on('pointerout', () => {
            HoverSprite.setVisible(false);
        });

        playAgain.on('pointerup', () => {
            this.scene.start('Game');
        });

        scoreboard.setInteractive();

        scoreboard.on('pointerover', () => {
            HoverSprite.setVisible(true);
            HoverSprite.play('chickendeath');
            HoverSprite.x = scoreboard.x + scoreboard.width - 50;
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

}
