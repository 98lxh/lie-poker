import { _decorator, Component, EventTouch, instantiate, Node, Prefab, rect, tween, UITransform, Vec3 } from 'cc';
import { rectContainsPoint } from '../../utils';
import { CardPrefab } from './card';
const { ccclass, property } = _decorator;

@ccclass('selfCards')
export class SelfCardsPrefab extends Component 
{
  _touchStart:Vec3 = null;
  _touchMoved:Vec3 = null;

  startX = 700;
  startY = 0;

  sourceX = 0;

  // 自己的手牌列表
  cards: Node[] = null;
  cardWidth = 0;

  // 牌的预制件
  @property({ type: Prefab })
  CardPrefab:Prefab | null = null;

  protected onLoad(): void 
  {
      this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
      this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
      // this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
  }


  onTouchStart(event: EventTouch)
  {
      const pos = event.getLocation();
      const startPos = this._touchStart = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
      this.checkSelectCard(startPos, startPos, true)
  }

  onTouchMove(event: EventTouch)
  {
     const pos = event.getLocation();
     const movedPos = this._touchMoved = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
     this.checkSelectCard(movedPos, movedPos);
  }

  checkSelectCard(startPos, endPos, isStart = false)
  {
    const len = this.cards.length;

    if(isStart)
    {
      for(let i = len - 1; i>= 0; i --){
        const card = this.cards[i];
        if(card.getComponent(UITransform).getBoundingBox().contains(startPos)){
            CardPrefab.getComponent(card).setIsChoose(true);
            return;
        }
      }
    }
      else
    {
      const w = Math.max(1, Math.abs(startPos.x - endPos.x));
      const h = Math.max(1, Math.abs(startPos.y - endPos.y));
      const x = Math.min(startPos.x, endPos.x);
      const y = Math.min(startPos.y, endPos.y);
      const touchRect = rect(x, y, w, h);

      for(let i = len - 1; i>= 0; i--)
      {
        const card = this.cards[i];

        if(card.getComponent(UITransform).getBoundingBox().intersects(touchRect))
        {
          CardPrefab.getComponent(card).setIsChoose(true);
          return
        }
      }

    }
  }


  sendCards(cards: any[])
  {
    // 生成手牌
    this.generateCards(cards)
    // 展示手牌
    this.showCards();
  }

  showCards(index = 0) 
  {
      const x = (this.sourceX + this.cardWidth * 0.4 * index);
      const card = this.cards[index];
      card.setPosition(x - 700, 0, 0)

      const callback = () => {
        if (index + 1 >= this.cards.length) { return; }
        this.showCards(index + 1);
      }

      tween(card)
      .to(0.1, { scale: new Vec3(1, 1, 1) }, { easing: 'cubicOut' })
      .call(callback)
      .to(0.1, { scale: new Vec3(0.8, 0.8, 0.8) }, { easing: 'cubicOut' })
      .start()
  }


    generateCards(cards: any[]) 
    {
        this.cards = [];
        for (let i = 0; i < 17; i++) 
        {
            const card = instantiate(this.CardPrefab);
            const cardWidth = card.getComponent(UITransform).width;

            card.setParent(this.node);
            card.setScale(new Vec3(0.8, 0.8, 0.8));

            this.sourceX = cardWidth * 0.4 * (-0.5) * (-13) + cardWidth * 0.4 * 0;
            card.setPosition(new Vec3(this.startX, this.startY, 0));
            card.active = true;

            const cardComp = CardPrefab.getComponent(card)
            cardComp.display(cards[i]);
            this.cards.push(card);
            this.cardWidth = cardWidth;
        }
    }


    static getComponent(node: Node): SelfCardsPrefab{
      return node.getComponent('selfCards') as SelfCardsPrefab
   }

}


