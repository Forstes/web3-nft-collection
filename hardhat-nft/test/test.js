const { expect } = require("chai");

describe("JustNFTCollection", function () {
  let contract;
  let user;
  let ipfsGatewayUrl;
  let sampleMetadataHash;

  beforeEach(async function () {
    const NFT = await ethers.getContractFactory("JustNFTCollection");

    [user] = await ethers.getSigners();
    ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";
    sampleMetadataHash = "QmSjy5d5y5vqJ5Sh5eYkALcZPHkU3q9X6ixHPRzctFDU6d";

    contract = await NFT.deploy("Just NFT Collection", "JNC", ipfsGatewayUrl);
    await contract.deployed();
  });

  it("Should deploy with correct name, symbol, and IPFS gateway", async function () {
    expect(await contract.name()).to.equal("Just NFT Collection");
    expect(await contract.symbol()).to.equal("JNC");
    expect(await contract.ipfsGatewayUrl()).to.equal(ipfsGatewayUrl);
  });

  it("Should mint a new token", async function () {
    // Mint a new token and transfer it to user
    await contract.connect(user).mint(user.address, sampleMetadataHash);

    // Check that the token was transferred correctly
    expect(await contract.ownerOf(1)).to.equal(user.address);
    expect(await contract.balanceOf(user.address)).to.equal(1);
  });

  it("Should not mint a new token if metadata is empty", async function () {
    await expect(contract.connect(user).mint(user.address, "")).to.be.revertedWith("Metadata couldn't be empty");
  });

  it("Should return the correct token URI", async function () {
    await contract.connect(user).mint(user.address, sampleMetadataHash);

    expect(await contract.tokenURI(1)).to.equal(ipfsGatewayUrl + sampleMetadataHash);
  });

  it("should return an array of token URIs owned by user", async function () {
    // Mint some tokens and transfer them to a user
    await contract.connect(user).mint(user.address, "somemetadata1");
    await contract.connect(user).mint(user.address, "somemetadata2");

    const tokenURIs = await contract.connect(user).getTokenURIsOwnedByUser(user.address);

    // Check that the token URIs are correct
    expect(tokenURIs).to.have.lengthOf(2);
    expect(tokenURIs[0]).to.equal(ipfsGatewayUrl + "somemetadata1");
    expect(tokenURIs[1]).to.equal(ipfsGatewayUrl + "somemetadata2");
  });
});
