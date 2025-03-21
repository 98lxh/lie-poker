import { _decorator, Component, Node, Sprite, SpriteAtlas, Vec3 } from 'cc';
import { mapCardToKing, mapCardToShape, mapCardToValue } from 'db://assets/constants/map';
const { ccclass, property } = _decorator;

@ccclass('card')
export class CardPrefab extends Component 
{
    @property({ type: SpriteAtlas })
    cards: SpriteAtlas | null = null;

    @property({ type: Node })
    MaskNode:Node | null = null;

    isChoose = false;
    offsetY = 0;


    protected onLoad(): void 
    {
        this.offsetY = 20;
        this.MaskNode.active = false;
    }


    display(card: Card){
        let spriteKey = '';
        
        if(card.shape)
        {
            spriteKey = `card_${mapCardToShape[card.shape] * 13 + mapCardToValue[card.value]}`
        } 
         else 
        {
            spriteKey = `card_${mapCardToKing[card.value]}`
        }

        this.node.getComponent(Sprite).spriteFrame = this.cards.getSpriteFrame(spriteKey)
    }



    setIsChoose(isChoose: boolean)
    {
      this.isChoose = isChoose;
      this.MaskNode.active = this.isChoose;
      const sourcePosition = this.node.getPosition();
      if(this.isChoose)
      {
        this.node.setPosition(new Vec3(sourcePosition.x, sourcePosition.y + 20, 0));
      }
        else
      {
        this.node.setPosition(new Vec3(sourcePosition.x, 0, 0));
      }

    }


    static getComponent(node: Node): CardPrefab{
       return node.getComponent('card') as CardPrefab
    }

}


