import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { NewPost } from "../generated/schema"
import { NewPost as NewPostEvent } from "../generated/PeerBlockOverflow/PeerBlockOverflow"
import { handleNewPost } from "../src/peer-block-overflow"
import { createNewPostEvent } from "./peer-block-overflow-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let cid = "Example string value"
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let newNewPostEvent = createNewPostEvent(id, cid, from)
    handleNewPost(newNewPostEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewPost created and stored", () => {
    assert.entityCount("NewPost", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewPost",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cid",
      "Example string value"
    )
    assert.fieldEquals(
      "NewPost",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
