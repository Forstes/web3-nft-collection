// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract JustNFTCollection is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public ipfsGatewayUrl;
    mapping(uint256 => string) private _tokenMetadata;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _ipfsGatewayUrl
    ) ERC721(_name, _symbol) {
        ipfsGatewayUrl = _ipfsGatewayUrl;
    }

    function mint(
        address to,
        string memory metadataUri
    ) public returns (uint256) {
        require(bytes(metadataUri).length > 0, "Metadata couldn't be empty");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenMetadata(newTokenId, metadataUri);
        return newTokenId;
    }

    function _setTokenMetadata(
        uint256 tokenId,
        string memory metadataUri
    ) internal {
        _tokenMetadata[tokenId] = metadataUri;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return
            string(abi.encodePacked(ipfsGatewayUrl, _tokenMetadata[tokenId]));
    }

    // Bruh
    function getTokenURIsOwnedByUser(
        address user
    ) public view returns (string[] memory) {
        uint256[] memory ownedTokens = new uint256[](balanceOf(user));
        uint256 tokenCount = 0;
        for (uint256 i = 1; i < _tokenIds.current() + 1; i++) {
            if (_exists(i) && ownerOf(i) == user) {
                ownedTokens[tokenCount] = i;
                tokenCount++;
            }
        }
        string[] memory tokenURIs = new string[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenURIs[i] = tokenURI(ownedTokens[i]);
        }
        return tokenURIs;
    }
}
