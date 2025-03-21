import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { mockData, mockUserData } from '../../mock/test';
import { SelfCardsPrefab } from './prefabs/selfCards';

@ccclass('gameScene')
export class gameScene extends Component {
    @property({type: Node})
    playerSeatNode: Node | null = null;

    @property({type: Prefab})
    playerPrefab: Prefab | null = null

    @property({ type: Prefab })
    SelfCardsPrefab: Prefab | null = null;

    playerList = []


    protected onLoad(): void {
        this.playerList = []
        this.addPlayer(mockUserData[0] as unknown as Player)
        this.addPlayer(mockUserData[0].rootList[0] as unknown as Player)
        this.addPlayer(mockUserData[0].rootList[1] as unknown as Player)

        for(const player of this.playerList){
        }

        this.generateSelfCards(mockData);
    }


    addPlayer(playerData: Player){
        const seatIndex = playerData.seatindex;
        const player = instantiate(this.playerPrefab)
        player.parent = this.playerSeatNode.children[seatIndex]
        this.playerList.push(player);
        const playerComp = player.getComponent('player') as any;
        playerComp.init(playerData)
    }

    generateSelfCards(cards: any[])
    {
        const selfCards = instantiate(this.SelfCardsPrefab);
        selfCards.setParent(this.playerSeatNode);
        SelfCardsPrefab.getComponent(selfCards).sendCards(cards);
    }

}


