import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { NewPost } from "../generated/PeerBlockOverflow/PeerBlockOverflow"

export function createNewPostEvent(
  id: BigInt,
  cid: string,
  from: Address
): NewPost {
  let newPostEvent = changetype<NewPost>(newMockEvent())

  newPostEvent.parameters = new Array()

  newPostEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  newPostEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )
  newPostEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )

  return newPostEvent
}
