import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        // Display the background image
        this.add.image(512, 384, 'background');

        // Outline of the progress bar
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // Progress bar itself
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // Update the progress bar based on loading progress
        this.load.on('progress', (progress: number) => {
            bar.width = 4 + (460 * progress * 10); // Corrected calculation
        });
    }

    preload ()
    {
        
        this.load.image("background", "/assets/background.jpg"); 
        this.load.image("logo", "/assets/logo.jpg");
        this.load.image("grassShort", "/assets/tilegrassshort.png");
        this.load.image("grassLong", "/assets/tilegrasslong.png");
        this.load.spritesheet("chicken", "/assets/chicken.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("farmer", "/assets/farmer.png", {
            frameHeight: 48,
            frameWidth: 48
        });
        this.load.spritesheet("egg", "/assets/egg.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.audio("menuaudio","/assets/menu_music.mp3");
    }

    create ()
    {
       
        this.add.image(512,384,"background").setOrigin(0, 0); 
        this.add.image(512,384,"logo").setOrigin(0, 0); 
        this.add.sprite(512,384,"chicken").setOrigin(0, 0); 
        this.add.sprite(512,384,"farmer").setOrigin(0, 0); 
        this.add.sprite(512,384,"egg").setOrigin(0, 0); 
        this.add.image(512,384,"grassLong").setOrigin(0, 0);
        this.add.image(512,384,"grassShort").setOrigin(0, 0);


        
        const music = this.sound.get('menumusic');

        if (music) {
            music.play({ loop: true });
        }

       
        this.scene.start('MainMenu');
    }
}
