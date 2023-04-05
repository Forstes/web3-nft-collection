<script setup lang="ts">
import { CONTRACT_ABI, CONTRACT_ADDRESSES } from "@/constants/contract";
import { useWallet, address } from "@/scirpts/wallet";
import { ethers } from "ethers";
import { onMounted } from "vue";
import { create } from "ipfs-http-client";
const { connect } = useWallet();

onMounted(() => {
  connect()
    .then((signer) => {
      contract = new ethers.Contract(CONTRACT_ADDRESSES, CONTRACT_ABI, signer);
    })
    .catch((e) => alert(e));
});

let contract: any;

async function mint() {
  const tx = await contract.mint(address.value, "metadata")
  tx.wait();
  alert("Minted, transaction hash: " + tx.hash);
}

async function uploadMetadata() {
  const ipfs = create({
    url: "https://gateway.pinata.cloud",
  });

  // Construct the metadata JSON object
  const metadata = {
    name: "My NFT",
    description: "This is my first NFT",
    attributes: {
      damage: 10,
      health: 100,
      luck: 5,
    },
  };

  // Convert the metadata JSON object to a string
  const metadataString = JSON.stringify(metadata);

  // Upload the metadata to IPFS
  const metadataUpload = await ipfs.add(metadataString);

  console.log("Metadata IPFS hash:", metadataUpload.cid.toString());
}
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="p-8 bg-white rounded-md">
     <!--  <input type="number" min="1" step="1" placeholder="" /> -->
      <button @click="mint">Mint</button>
    </div>
  </div>
</template>
