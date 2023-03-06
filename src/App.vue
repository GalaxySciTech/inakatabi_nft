<template>
    <main class="containe">
        <router-view />
    </main>
</template>

<script>
import { useBlockChain } from '@/stores/blockChainStore';

export default {
    name: 'App',

    setup() {
        const blockChain = useBlockChain();
        return {
            blockChain,
        };
    },

    mounted() {
        this.blockChain.init_blockChain();
        this.blockChain.connectWallet();
        const blockChain = this.blockChain;
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', async function (accounts) {
                await blockChain.connectWallet();
            });
            window.ethereum.on('chainChanged', networkIDstring => {
                console.log('链切换', networkIDstring);
                window.location.reload();
            });
        }
    },
};
</script>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    min-width: 1100px;
    @media screen and (max-width: 1000px) {
        min-width: 100%;
    }
}
.containe {
    width: 100%;
    height: 100%;
    background: #ffffff;
}
</style>
