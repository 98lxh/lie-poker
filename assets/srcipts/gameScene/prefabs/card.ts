import { _decorator, Component, Node, Sprite, SpriteAtlas } from 'cc';
import { mapCardToKing, mapCardToShape, mapCardToValue } from 'db://assets/constants/map';
const { ccclass, property } = _decorator;

@ccclass('card')
export class card extends Component {
    @property({ type: SpriteAtlas })
    cards: SpriteAtlas | null = null

    offsetY = 0


    protected onLoad(): void {
        this.offsetY = 20;
    }


    display(card: Card){
        let spriteKey = '';
        
        if(card.shape){
            spriteKey =   `card_${mapCardToShape[card.shape] * 13 + mapCardToValue[card.value]}`
        } else {
            spriteKey = `card_${mapCardToKing[card.value]}`
        }

        this.node.getComponent(Sprite).spriteFrame = this.cards.getSpriteFrame(spriteKey)
    }

}


