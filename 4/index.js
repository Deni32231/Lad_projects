const read = require('readline-sync');


const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0,     // ходов на восстановление
            "nowCooldown": 0
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "nowCooldown": 0
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2,
            "nowCooldown": 0
        },
    ],
    choiceMove() {
        const randomChoice = Math.floor(Math.random() * this.moves.length);
        if (this.moves[randomChoice].nowCooldown === 0) {
            this.moves[randomChoice].nowCooldown = this.moves[randomChoice].cooldown;
            return this.moves[randomChoice]
        } else {
            return this.choiceMove();
        }
    },
    nextTurn() {
        this.moves.forEach((move) => {
            if (move.nowCooldown > 0) {
                move.nowCooldown -= 1;
            }
        })
    }
}

const hero = {
    maxHealth: null,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0,
            "nowCooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4,
            "nowCooldown": 0
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "nowCooldown": 0
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4,
            "nowCooldown": 0
        },
    ],

    choiceMove() {
        console.log('Выберите действие:')
        this.moves.forEach((move, i) => {
            if (move.nowCooldown === 0) {
                console.log(` ${i} - ${move.name}`);
            }
        })
        const choice = +read.question('Введите цифру действия\n\n');
        if (choice >= this.moves.length || choice < 0 || choice === NaN || this.moves[choice].nowCooldown !== 0) {
            return this.choiceMove();
        } else {
            this.moves[choice].nowCooldown = this.moves[choice].cooldown;
            return this.moves[choice];
        }
    },
    nextTurn() {
        this.moves.forEach((move) => {
            if (move.nowCooldown > 0) {
                move.nowCooldown -= 1;
            }
        })
    },
}

startGame();

function choiceMode() {
    const choice = read.question('Выберите сложность \n 1 - Easy \n 2 - Normal \n 3 - Hard \n\n')
    switch (choice) {
        case '1':
            hero.maxHealth = 20;
            console.log('\nВыбран легкий режим.');
            break;
        case '2':
            hero.maxHealth = 15;
            console.log('\nВыбран нормальный режим.');
            break;
        case '3':
            hero.maxHealth = 10;
            console.log('\nВыбран сложный режим.');
            break;
        case '0':
            hero.maxHealth = 5;
            console.log('\nВыбран секретный режим,\nпоможет только удача...');
            break;
        default:
            choiceMode();
    }
}

function startGame() {
    choiceMode();

    monsterHealth = monster.maxHealth;
    heroHealth = hero.maxHealth;
    turn = 1;


    console.log('Битва началась.')

    while (true) {
        if (monsterHealth <= 0) {
            console.log('\n---------------------------------------------');
            console.log(`\nГерой ${hero.name} победил мостра ${monster.name}`);
            console.log('\n---------------------------------------------')
            break;
        } else if (heroHealth <= 0) {
            console.log('\n---------------------------------------------')
            console.log(`\nГерой ${hero.name} пал от рук мостра ${monster.name}`);
            console.log('\n---------------------------------------------')
            break;
        }
        console.log('\n---------------------------------------------')
        console.log(`Ход ${turn}\n`);
        console.log(`Текущее здоровье:\n ${hero.name} - ${heroHealth}\n ${monster.name} - ${monsterHealth}`);
        
        const monsterMove = monster.choiceMove();
        console.log(`\nМонстр ${monster.name} совершает ${monsterMove.name}\n`);

        const heroMove = hero.choiceMove();

        [heroDmg, monsterDmg] = calcDamage(heroMove, monsterMove);

        console.log(`В этом ходу ${hero.name} наносит урон ${heroDmg}, ${monster.name} наносит урон ${monsterDmg}`);
        monsterHealth -= heroDmg;
        heroHealth -= monsterDmg;

        turn++;
        hero.nextTurn();
        monster.nextTurn();
    }
}

function calcDamage(heroMove, monsterMove) {
    const heroPhysicalDmg = heroMove.physicalDmg * ((100 - monsterMove.physicArmorPercents) / 100);
    const heroMagicDmg = heroMove.magicDmg * ((100 - monsterMove.physicArmorPercents) / 100);
    const heroAllDmg = heroPhysicalDmg + heroMagicDmg;

    const monsterPhysicalDmg = monsterMove.physicalDmg * ((100 - heroMove.physicArmorPercents) / 100);
    const monsterMagicDmg = monsterMove.magicDmg * ((100 - heroMove.magicArmorPercents) / 100);
    const monsterAllDmg = monsterPhysicalDmg + monsterMagicDmg;

    return [heroAllDmg, monsterAllDmg];
}