import { Vec3, Node, UITransform, Vec2, Rect } from "cc";


// 判断矩形是否和一个点相交
export function rectContainsPoint(node: Node, point: Vec3 | Vec2){
  if(!node.getComponent(UITransform)) return false;
  return node.getComponent(UITransform).getBoundingBox().contains(new Vec2(point.x, point.y));
}
