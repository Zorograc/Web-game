import firebase from 'firebase/compat/app';
import { EventBus } from '../EventBus';
import { GameObjects,Scene } from 'phaser';
import { Physics } from 'phaser';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";



export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    keyboard: { [index: string]: Phaser.Input.Keyboard.Key };
    chicken: Phaser.Physics.Arcade.Sprite;
    egg: Phaser.Physics.Arcade.Sprite;
    farmer: Phaser.Physics.Arcade.Sprite;
    scoreText: GameObjects.Text;
    platforms: Phaser.Physics.Arcade.StaticGroup;

    
    private toDestroy: Phaser.GameObjects.GameObject[] = [];
    constructor ()
    {
        super('Game');
    }
    preload() {
        
        this.anims.create({
            key: "chickenstand",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [0]
                
            }),
        repeat: -1,
        });

        this.anims.create({
            key: "chickenwalk",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [0,1,2,3,]
                
            }),
        repeat: -1,
        });
        this.anims.create({
            key: "chickenjump",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [4,5,6,7]
                
            }),
        repeat: -1,
        });
        this.anims.create({
            key: "chickenshoot",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [8,9,10,11]
                
            }),
        repeat: -1,
        });
        this.anims.create({
            key: "chickendeath",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("chicken", {
                frames: [12,13,14,15]
                
            }),
        
        });
        this.anims.create({
            key: "egg",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("egg", {
                frames: [0]
                
            }),
        repeat: -1,
        });

        this.anims.create({
            key: "farmerwalk",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("farmer", {
                frames: [18,19,20,21,22,23]
                
            }),
        repeat: -1,
        });
        this.anims.create({
            key: "farmerjump",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("farmer", {
                frames: [7,8,9,10]
                
            }),
        repeat: -1,
        });
        this.anims.create({
            key: "farmerhit",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("farmer", {
                frames: [30,31,32,33,34,35,36,]
                
            }),
        
        });
        this.anims.create({
            key: "farmerdeath",
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("farmer", {
                frames: [36,37,38,39,40,41]
                
            }),
        
        });
        
    }
    
    
        
    create ()
    {

        this.camera = this.cameras.main;

        this.background = this.add.image(512, 384, 'background').setOrigin(0.5).setDepth(1);

        this.background.setAlpha(0.1);

        // PLATFORMS

        const platforms = this.physics.add.staticGroup();

        platforms.create(50,739, "grassLong").setScale(2).refreshBody();
        platforms.create(200,739, "grassLong").setScale(2).refreshBody();

        platforms.create(350,739, "grassLong").setScale(2).refreshBody();
        platforms.create(450,739, "grassLong").setScale(2).refreshBody();
        platforms.create(550,739, "grassLong").setScale(2).refreshBody();
        platforms.create(650,739, "grassLong").setScale(2).refreshBody();
        platforms.create(750,739, "grassLong").setScale(2).refreshBody();
        platforms.create(830,739, "grassLong").setScale(2).refreshBody();


        platforms.create(1000,739, "grassLong").setScale(2).refreshBody();



        

        this.egg = this.physics.add.sprite(100, 500, "egg", 1).setDepth(10);
        this.egg.visible = false; 
        this.egg.setBounce(0.2);
        this.egg.setCollideWorldBounds(true);
        /* CHICKEN */
        this.chicken = this.physics.add.sprite(50, 500, "chicken", 1).setDepth(10);
        this.chicken.setBounce(0.2);
        this.chicken.setCollideWorldBounds(true);
        this.physics.add.collider(this.chicken, platforms);

        /* FARMER */
        this.farmer = this.physics.add.sprite(300, 500, "farmer", 1 ).setDepth(10).setScale(1.5,1.5);
        
        this.farmer.setBounce(0.2);
        this.farmer.setPushable(false);
        this.farmer.setCollideWorldBounds(true);
        this.physics.add.collider(this.farmer, platforms);
        this.farmer.setSize(30, 32); 
        this.farmer.setOffset(0, 15); 
        /* FARMER MOVEMENT */

        
        
        this.physics.add.collider(this.chicken, this.farmer, farmerKillChicken, null, this);
        /* FARMER KILLS CHICKEN */
        function farmerKillChicken(chicken, farmer) {
            farmer.anims.stop(); 
            if (chicken.x < farmer.x) {
                farmer.flipX = true;
            };
            this.egg.destroy();
            farmer.setVelocityX(0);
            farmer.play("farmerhit");
            chicken.body.moves = false;
            this.farmer.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.scene.start('GameOver');
            })
            
            
            const db = getFirestore();
            
                try {
                  const docRef = addDoc(collection(db, "scores"), {
                    score: score,
                    user: userEmail
                  });
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
           
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('email', user.email); 
            } else {
                localStorage.removeItem('email');
            }
        });
            let userEmail = localStorage.getItem('email');

        this.keyboard = this.input!.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        const ScoreText = this.scoreText = this.add.text(90, 32, 'Rezultat: 0', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5).setDepth(100);
        let score = 0;
        /* CHICKEN KILLS FARMER */
        this.physics.add.collider(this.egg, this.farmer, egghit, null, this);
        
        function egghit(egg,farmer){
            this.farmer.play("farmerdeath");
            this.egg.disableBody(true, true);
            this.egg.setVisible(false);

                this.farmer.destroy();
            score += 1;
            ScoreText.setText("Rezultat: "+ score);

            const minSpawnX = 100; 
            const maxSpawnX = 700; 
            const minSpawnY = 100; 
            const maxSpawnY = 600; 
            const newX = Math.random() * (maxSpawnX - minSpawnX) + minSpawnX;
            const newY = Math.random() * (maxSpawnY - minSpawnY) + minSpawnY;

            this.farmer = this.physics.add.sprite(newX, newY, "farmer", 1 ).setDepth(10).setScale(1.5,1.5);
            
            this.farmer.setBounce(0.2);
            this.farmer.setPushable(false);
            this.farmer.setCollideWorldBounds(true);
            this.physics.add.collider(this.farmer, platforms);
            this.farmer.setSize(30, 32); 
            this.farmer.setOffset(0, 15); 

            this.physics.add.collider(this.chicken, this.farmer, farmerKillChicken, null, this);
            this.physics.add.collider(this.farmer, this.egg, egghit, null, this);

    
        }
        this.physics.add.collider(this.egg, platforms, eggfall, null, this);
        
        function eggfall(egg,platforms) {
            this.egg.disableBody(true,true);
            this.egg.setVisible(false);
        }
        
        

        EventBus.emit('current-scene-ready', this);
    }
    
    update(time: number, delta: number){

        /* FARMER MOVEMENT */

        if (this.farmer) {
            
            const dx = this.chicken.x - this.farmer.x;
            const distance = Math.sqrt(dx * dx);
    
            const dirX = dx / distance;
            this.farmer.setVelocityX(dirX * 50); 
            if (dirX > 0) {
                this.farmer.flipX = false;
            } else {
                this.farmer.flipX = true;
            }
            
        }

        if (this.keyboard.D.isDown === true){
            this.chicken.setVelocityX(+100);
            this.chicken.setFlipX(true);
            this.chicken.anims.playReverse("chickenwalk", true);
        }
        if (this.keyboard.A.isDown === true){
            this.chicken.setVelocityX(-100);
            this.chicken.setFlipX(false);
            this.chicken.play("chickenwalk", true);
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
            this.chicken.setVelocityX(0);
            this.chicken.play("chickenstand", true);
        }
        if (this.keyboard.W.isDown && this.chicken.body?.touching.down){
            this.chicken.setVelocityY(-300);
        }
        if (this.keyboard.SPACE.isDown === true){
            this.egg.enableBody(true, this.chicken.x, this.chicken.y, true, true);
        this.egg.setVisible(true);
        this.egg.setBounce(0.2);
        this.egg.setCollideWorldBounds(true);
        this.chicken.play("chickenshoot", true);
            
        }
   
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
