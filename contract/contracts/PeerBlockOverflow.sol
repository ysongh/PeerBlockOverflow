// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract PeerBlockOverflow {
    uint public postCount = 0;
    Post[] public posts;

    struct Post{
        uint id;
        string cid;
        address from;
    }
    mapping(address => uint[]) public ratings;

    event rated(address to, uint num, address from);

    constructor() {}

    function addPost(string memory cid) external {
        posts.push(Post(postCount, cid, msg.sender));
        postCount++;
    }

    function getPosts() external view returns (Post[] memory) {
        return posts;
    }
}