<template>
    <div class="main-page">
        <Home />
        <!-- <Version /> -->
        <Fqa />
        <Mint />
    </div>
</template>
<script setup>
import { watch, onMounted, reactive, onBeforeUnmount } from 'vue';
import { useBlockChain } from '@/stores/blockChainStore';
import { ElButton, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import Home from './components/home.vue'
import Fqa from './components/faq.vue'
import Mint from './components/mint.vue'
// import Version from './components/version.vue'
import { $hash, $shiftedBy, $shiftedByToBig, $copy, $toFixed, $shiftedByString, $dealTimes, $number, $shiftedByFixed } from '@/utils';
let timer = null;
const { t } = useI18n();
const state = reactive({
    
});

const blockChain = useBlockChain();
watch(
    () => blockChain.account,
    () => {
        init();
    }
);

const copy = text => {
    $copy(text)
        .then(res => {
            ElMessage.success(t('copy successfully'));
        })
        .catch(e => {
            ElMessage.error(t('copy failed'));
        });
};

const init = async () => {
    if (blockChain.account && blockChain.chainId) {
        // if (![1,5].includes(Number(blockChain.chainId))) {
        //     ElMessage.error({
        //         message: t('change network'),
        //         duration: 7000,
        //     });
        //     return;
        // }
    }
};
onBeforeUnmount(() => {
    clearInterval(timer);
    timer = null;
});
onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.main-page {
   width: 100%;
   height: 100%;
}
</style>
