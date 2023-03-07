pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DissYourDream is Base721, ReentrancyGuard {
    uint256 public publicPrice;

    uint256 public wlPrice;

    uint256 public publicStartTime;

    uint256 public publicEndTime;

    bytes32 public wlMintRoot;

    uint256 public wlNum;

    uint256 public maxWlSupply;

    mapping(address => bool) public wlMinted;

    constructor() public ERC721A("DissYourDream", "DissYourDream") {
        maxSupply = 3333;
        maxWlSupply = 3333;
        publicPrice = 0.015 ether;
        wlPrice = 0.009 ether;
        publicStartTime = 1667620800;
        publicEndTime = 999999999999;
    }

    function wlMint(
        bytes32[] calldata _proof,
        uint256 _num
    ) external payable nonReentrant {
        require(_num <= 2, "num must lower than 2");
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_proof, wlMintRoot, leaf),
            "Merkle verification failed"
        );
        require(!wlMinted[_msgSender()], "Already wl mint");
        require(
            block.timestamp >= publicStartTime &&
                block.timestamp <= publicEndTime,
            "Must in time"
        );
        require(totalSupply() + _num <= maxSupply, "Must lower than maxSupply");
        require(wlNum + _num <= maxWlSupply, "Must lower than maxWlSupply");
        require(msg.value >= wlPrice * _num, "Must greater than value");
        _mint(_msgSender(), _num);
        wlNum += _num;
        wlMinted[_msgSender()] = true;
    }

    function publicMint(uint256 _num) external payable nonReentrant {
        require(
            block.timestamp >= publicStartTime &&
                block.timestamp <= publicEndTime,
            "Must in time"
        );
        require(msg.value >= publicPrice * _num, "Must greater than value");
        require(totalSupply() + _num <= maxSupply, "Must lower than maxSupply");
        _mint(_msgSender(), _num);
    }

    function setSupply(uint256 _maxWlSupply) external onlyOwner {
        maxWlSupply = _maxWlSupply;
    }

    function setRoot(bytes32 _wlMintRoot) external onlyOwner {
        wlMintRoot = _wlMintRoot;
    }

    function setPrice(
        uint256 _publicPrice,
        uint256 _wlPrice
    ) external onlyOwner {
        publicPrice = _publicPrice;
        wlPrice = _wlPrice;
    }

    function setTime(
        uint256 _publicStartTime,
        uint256 _publicEndTime
    ) external onlyOwner {
        publicStartTime = _publicStartTime;
        publicEndTime = _publicEndTime;
    }
}
