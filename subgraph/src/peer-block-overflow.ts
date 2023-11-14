import { NewPost as NewPostEvent } from "../generated/PeerBlockOverflow/PeerBlockOverflow"
import { NewPost } from "../generated/schema"

export function handleNewPost(event: NewPostEvent): void {
  let entity = new NewPost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.id = event.params.id
  entity.cid = event.params.cid
  entity.from = event.params.from

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
