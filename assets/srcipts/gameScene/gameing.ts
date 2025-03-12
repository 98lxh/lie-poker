import { _decorator, Component, instantiate, Node, Prefab, tween, UITransform, Vec3, Touch, EventTouch } from 'cc';
import { mockData } from '../../mock/test';

const { ccclass, property } = _decorator;

const startY = 0;
const startX = 700;

@ccclass('gameing')
export class gameing extends Component {
    cardWidth = 0;
    cards = null;
    sourceX = 0;
    private touchStartPos: Vec3 = new Vec3();
    private selectedCards: Node[] = [];

    @property({ type: Prefab })
    CardPrefab: Prefab | null = null;

    @property({ type: Node })
    SelfCardsNode: Node | null = null;

    protected onLoad(): void {
        this.generateCards(mockData);
        this.showCards();
    }

    showCards(index = 0) {
        const x = (this.sourceX + this.cardWidth * 0.4 * index);
        const card = this.cards[index];

        card.setPosition(x - 700, 0, 0)

        tween(card)
            .to(0.1, { scale: new Vec3(1, 1, 1) }, { easing: 'cubicOut' })
            .call(() => {
                if (index + 1 >= this.cards.length) { return; }
                this.showCards(index + 1);
            })
            .to(0.1, { scale: new Vec3(0.8, 0.8, 0.8) }, { easing: 'cubicOut' })
            .start()
    }

    generateCards(data: any[]) {
        this.cards = [];

        for (let i = 0; i < 17; i++) {
            const card = instantiate(this.CardPrefab);
            const cardWidth = card.getComponent(UITransform).width;

            card.setParent(this.SelfCardsNode);
            card.setScale(new Vec3(0.8, 0.8, 0.8));

            this.sourceX = cardWidth * 0.4 * (-0.5) * (-16) + cardWidth * 0.4 * 0;
            card.setPosition(new Vec3(startX, startY, 0));
            card.active = true;

            const cardComp = card.getComponent('card') as any;
            cardComp.display(data[i]);
            this.cards.push(card);
            this.cardWidth = cardWidth;
        }
    }
}


