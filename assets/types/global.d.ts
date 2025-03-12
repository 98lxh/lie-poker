declare interface Card {
  "index": number,
  "king"?: number,
  "value": number,
  "val": number,
  "shape": number
}


declare interface Player {
  "userId": string,
  "userName": string,
  "roomId": string,
  "seatindex": number,
  "avatarUrl": string,
  "goldcount": number,
  "rootList": Player[],
  "masterUserId": string,
  "gobal_count": string | null,
  "bottom": string,
  "rate": string
}
