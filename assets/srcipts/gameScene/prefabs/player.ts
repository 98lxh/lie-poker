import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('player')
export class player extends Component {

  userId = '';

  protected onLoad(): void {


  }


  init(data: Player, index: number){
    this.userId = data.userId;
  }

}


