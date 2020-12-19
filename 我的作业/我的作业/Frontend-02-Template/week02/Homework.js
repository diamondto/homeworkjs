class Animal {
  constructor(species, health) {
    this.species = species;
    this.health = health;
  }
}

class Dog extends Animal {
  constructor(name, health) {
    super('狗', health);
    this.name = name;
  }

  bite() {
    return '咬';
  }

  biteTo(target) {
    return `咬了${target.name}`;
  }
}

class Human extends Animal {
  constructor(name, health) {
    super('人', health);
    this.name = name;
  }

  beHurt() {
    return `受到伤害`;
  }

  beHurtBy(source) {
    this.healthDecline();
    return `受到${source.name}的伤害`;
  }

  healthDecline() {
    return `健康值下降`;
  }
}

// 事件基类
class Incident {
  constructor() {
    console.log('发生了事件');
  }
}

// 动物攻击人类事件基类
class AnimalAttackHuman extends Incident {
  constructor(animal, human) {
    super();
    console.log(`发生了${animal.species}攻击${human.species}的事件`);
  }
}

// 动物咬伤人类事件基类
class AnimalBiteHuman extends AnimalAttackHuman {
  constructor(animal, human) {
    super(animal, human);
    console.log(`事件描述：${animal.species}${animal.bite()}${human.species},导致${human.species}${human.beHurt()}`);
    console.log(`事件详情：一只名叫${animal.name}的${animal.species}${animal.biteTo(human)},导致${human.name}${human.beHurtBy(animal)}`);
  }
}

const huahua = new Dog('花花', 100);
const xiaoming = new Human('小明', 100);

const aIncident = new AnimalBiteHuman(huahua, xiaoming);
