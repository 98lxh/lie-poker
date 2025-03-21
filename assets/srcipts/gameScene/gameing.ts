import { _decorator, Component, instantiate, Prefab} from 'cc';
import { SelfCardsPrefab } from './prefabs/selfCards';
import { mockData } from '../../mock/test';

const { ccclass, property } = _decorator;


@ccclass('gameing')
export class gameing extends Component {
    @property({ type: Prefab })
    SelfCardsPrefab: Prefab | null = null;


    protected onLoad(): void 
    {
        this.generateSelfCards();
    }

    generateSelfCards()
    {
        const selfCards = instantiate(this.SelfCardsPrefab);
        selfCards.setParent(this.node);
        SelfCardsPrefab.getComponent(selfCards).generateCards(mockData);
    }
}


