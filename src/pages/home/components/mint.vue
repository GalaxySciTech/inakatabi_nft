<template>
    <div class="mint">
        <div class="content">
            <div class="header">
                <img src="../../../assets/images/base/logo.png" alt="" />
                <!-- <div class="state">
                    <div class="areaMintStatus">NOT FOR SALE</div>
                </div> -->
                <!-- <div class="cont">
                    <img src="../../../assets/images/home/Logo_Minting.png" alt="" />
                </div> -->
            </div>
            <div class="action">
                <div class="top">
                    <div class="character">
                        <img src="../../../assets/images/home/faq-mint.png" alt="mint img" />
                    </div>
                    <div class="contents">
                        <div class="text-box">My heart won't stop beating from the fact that I'm in another world!</div>
                        <div class="mint-info">
                            <div class="row">
                                <div>Amount</div>
                                <div class="right publich">
                                    <div class="minus" @click="handAmount('minus')">-</div>
                                    <input @keyup="setAmount" v-model.trim="state.amount" class="from-input" type="text" placeholder="0" />
                                    <div class="plus" @click="handAmount('plus')">+</div>
                                </div>
                            </div>
                            <div class="row">
                                <div>Price</div>
                                <div class="right">{{ state.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <el-button class="btn" :disabled="disabled" :loading="state.loadding" data-mdb-ripple="true" data-mdb-ripple-color="light" @click="mint()">MINT NOW</el-button> -->
                <el-button class="btn" :disabled="!state.isSatrtMint || (!state.currentIsPublich && !state.isWhiteList)" :loading="state.loadding" data-mdb-ripple="true" data-mdb-ripple-color="light" @click="mint()">{{(!state.currentIsPublich && !state.isWhiteList) ? 'NOT WHITE' : 'MINT NOW'}}</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { watch, onMounted, reactive, onBeforeUnmount, computed } from 'vue';
import { useBlockChain } from '@/stores/blockChainStore';
import { ElButton, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
// import { MerkleTree } from 'merkletreejs';
// import keccak256 from 'keccak256';
import WhiteList from '../whitelist';

import { $hash, $shiftedBy, $filterNumberVal, $shiftedByToBig, $copy, $toFixed, $shiftedByString, $dealTimes, $number, $shiftedByFixed } from '@/utils';
const Web3 = require('web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let timer = null;
const web3 = new Web3('');
const { t } = useI18n();
const state = reactive({
    isSatrtMint: false,
    currentIsPublich: false,
    price: '--',
    publichMaxNumber: 2,
    publichMaxNumber: 2,
    ethBalance: 0,
    loadding: false,
    amount: 1,
    publichMintedAmount: '--',
    wlMintedAmount: '--',
    isWhiteList: true,
});

const blockChain = useBlockChain();
watch(
    () => blockChain.account,
    () => {
        init();
    }
);

const disabled = computed(() => {
    if (state.publichMintedAmount === '--' || state.wlMintedAmount === '--') return true;
    if (state.currentIsPublich) {
        return state.publichMintedAmount >= 3;
    } else {
        return state.wlMintedAmount >= 2;
    }
});

const copy = text => {
    $copy(text)
        .then(res => {
            ElMessage.success(t('copy successfully'));
        })
        .catch(e => {
            ElMessage.error(t('copy failed'));
        });
};

const handAmount = type => {
    let _amount = '';
    if (state.publichMintedAmount === '--' || state.wlMintedAmount === '--'){
        ElMessage({
            showClose: true,
            message: 'Loading data, try again later!!!',
            type: 'error',
            duration: 2500,
        });
        state.amount = '';
        return;
    } 
    if (state.currentIsPublich) {
        if (type === 'minus') {
            _amount = Math.max(state.amount - 1, 1);
        } else {
            _amount = Math.min(state.amount + 1, 5 - state.publichMintedAmount - state.wlMintedAmount);
        }
    } else {
        if (type === 'minus') {
            _amount = Math.max(state.amount - 1, 1);
        } else {
            _amount = Math.min(state.amount + 1, 2 - state.wlMintedAmount);
        }
    }

    state.amount = _amount;
};

const setAmount = e => {
    const val = e.target.value;
    if (state.publichMintedAmount === '--' || state.wlMintedAmount === '--') {
        ElMessage({
            showClose: true,
            message: 'Loading data, try again later!!!',
            type: 'error',
            duration: 2500,
        });
        state.amount = '';
        return;
    } else {
        const amount = $filterNumberVal(val);
        if (state.currentIsPublich) {
            state.amount = Math.min(Math.max(amount - 1, 1), 3 - state.publichMintedAmount);
        } else {
            state.amount = Math.min(Math.max(amount - 1, 1), 2 - state.wlMintedAmount);
        }
    }
};

const getBalance = async () => {
    const balance = await blockChain.getBalance('0x0000000000000000000000000000000000000000');
    state.ethBalance = $shiftedBy(balance.toString(), -18, 4);
};

const getResetData = async () => {
    const contract = blockChain.getContract();
    const publicStartTime = await contract.publicStartTime();
    if (Math.floor(Date.now() / 1000) >= publicStartTime.toString()) {
        const publicEndTime = await contract.publicEndTime();
        if (Math.floor(Date.now() / 1000) < publicEndTime.toString()) {
            state.isSatrtMint = true;
        } else {
            state.isSatrtMint = false;
        }
        state.currentIsPublich = true;
    } else {
        const wlStartTime = await contract.wlStartTime();
        const wlEndTime = await contract.wlEndTime();
        
        if (Math.floor(Date.now() / 1000) > wlStartTime.toString() && Math.floor(Date.now() / 1000) < wlEndTime.toString()) {
            state.isSatrtMint = true;
        } else {
            state.isSatrtMint = false;
        }
        state.currentIsPublich = false;
    }

    let price;
    if (state.currentIsPublich) {
        price = await contract.publicPrice();
    } else {
        price = await contract.wlPrice();
        // state.iswlMinted = await contract.wlMinted(blockChain.account);
    }
    state.price = $shiftedBy(price.toString(), -18, 6);
};

const getMintedAmout = async () => {
    const contract = blockChain.getContract();
    const _wlMintedAmount = await contract.wlMinted(blockChain.account);
    console.log('_wlMintedAmount:', _wlMintedAmount.toString());
    const _publichMintedAmount = await contract.publicMinted(blockChain.account);
    console.log('_publichMintedAmount:', _publichMintedAmount.toString());
    state.publichMintedAmount = _publichMintedAmount.toString();
    state.wlMintedAmount = _wlMintedAmount.toString();
    // state.publichMintedAmount = 0;
    // state.wlMintedAmount = 0;
};

const caleProof = () => {
    // const WhiteList = [blockChain.account, '0x619B75f4D55285741a24b047944FBdF27E49f9d1'];

    const leaves = WhiteList.map(x => keccak256(x));
    // const merkleTree = new MerkleTree(leaves, keccak256);
    const merkleTree = new MerkleTree(leaves, keccak256, { sort: true });
    const _rootHash = merkleTree.getRoot().toString('hex');
    const _leaf = keccak256(blockChain.account);
    const _proof = merkleTree.getProof(_leaf);

    const rootHash = `0x${_rootHash.toString('hex')}`;
    const leaf = `0x${_leaf.toString('hex')}`;
    const proof = _proof.map(x => '0x' + x.data.toString('hex'));

    console.log('leaf', leaf);
    console.log('rootHash', rootHash);

    console.log('proof', proof);
    return proof;
};

const mint = async () => {
    if (state.publichMintedAmount === '--' || state.wlMintedAmount === '--') {
        ElMessage({
            showClose: true,
            message: 'Loading data, try again later!!!',
            type: 'error',
            duration: 2500,
        });
        return;
    }

    if (state.currentIsPublich && state.publichMintedAmount >= 3) {
        ElMessage({
            showClose: true,
            message: 'The maximum amount of public offering Mint has been reached',
            type: 'error',
            duration: 2500,
        });
        return;
    }

    if (!state.currentIsPublich) {
        if (WhiteList.indexOf(blockChain.account.toLowerCase()) === -1) {
            ElMessage({
                showClose: true,
                message: 'You are not on the whitelist and cannot participate in private placement',
                type: 'error',
                duration: 2500,
            });
            return;
        }
        if (state.wlMintedAmount >= 2) {
            ElMessage({
                showClose: true,
                message: 'Reached the maximum number of private placement Mint',
                type: 'error',
                duration: 2500,
            });
            return;
        }
    }
    // if (!state.currentIsPublich && state.iswlMinted) {
    //     ElMessage({
    //         showClose: true,
    //         message: '您已经Mint过，不能重复Mint',
    //         type: 'error',
    //         duration: 2500,
    //     });
    //     return;
    // }
    if (state.price * state.amount > state.ethBalance) {
        ElMessage({
            showClose: true,
            message: 'The current ETH balance is insufficient',
            type: 'error',
            duration: 2500,
        });
        return;
    }
    state.loadding = true;
    try {
        const contract = blockChain.getContract();
        const proof = caleProof();
        const override = {
            value: $shiftedByToBig(state.price * state.amount, 18),
        };

        let transaction;
        if (state.currentIsPublich) {
            transaction = await contract.publicMint(state.amount, override);
        } else {
            transaction = await contract.wlMint(proof, state.amount, override);
        }
        const result = await blockChain.awaitTransactionMined(transaction.hash);
        // const result = true;
        if (result) {
            ElMessage({
                showClose: true,
                message: 'Mint Successfully',
                type: 'success',
                duration: 2500,
            });
            state.ethBalance = $number(state.ethBalance).minus($number(state.price).multipliedBy(state.amount)).toFixed(4, 1);
            if (state.currentIsPublich) {
                state.publichMintedAmount += state.amount;
            } else {
                state.wlMintedAmount += state.amount;
                // state.iswlMinted = true;
            }
            state.amount = 1;
            getBalance();
            getMintedAmout();
        } else {
            ElMessage({
                showClose: true,
                message: e?.reason ?? e?.message ?? 'Mint Fail',
                type: 'error',
                duration: 2500,
            });
        }
    } catch (e) {
        console.error('error', e);
        ElMessage({
            showClose: true,
            message: e?.reason ?? e?.message ?? 'Mint Error',
            type: 'error',
            duration: 2500,
        });
    } finally {
        state.loadding = false;
    }
};

const init = async () => {
    if (blockChain.account && blockChain.chainId) {
        if (![1,5].includes(Number(blockChain.chainId))) {
            ElMessage.error({
                message: 'Please switch to the Ethereum network',
                duration: 10000,
            });
            return;
        }
        state.isWhiteList = WhiteList.indexOf(blockChain.account.toLowerCase()) !== -1
        getMintedAmout();
        getBalance();
        getResetData();
    }
};
onBeforeUnmount(() => {});
onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.mint {
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/home/minting-PC.png') no-repeat center top/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 850px;
    .content {
        width: 700px;
        height: auto;
        min-height: 450px;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0px 4px 4px #9b366f, inset 0px 4px 20px rgba(255, 164, 164, 0.56);
        backdrop-filter: blur(25px);
        border-radius: 30px;
        position: relative;
        top: 7%;
        .header {
            position: relative;
            display: flex;
            justify-content: end;
            background: linear-gradient(90deg, #ff9fd5 29.62%, rgba(255, 255, 255, 0.2) 97.52%);
            border-radius: 30px 30px 0px 0px;
            img {
                padding: 10px 23px;
                height: 82px;
            }
            .state {
                position: absolute;
                top: -5px;
                left: -25px;
                z-index: 9;
                .areaMintStatus {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: auto;
                    height: 45px;
                    color: #fff;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 83px;
                    white-space: nowrap;
                    padding: 10px 16px;
                    background: #8a8a8a;
                    border-radius: 12px;
                    transform: rotate(-15deg);
                }
            }
            .cont {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                img {
                    height: 90px;
                }
            }
        }
        .action {
            /* margin: 40px 0 0; */
            /* padding: 0 32px; */
            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 32px;
                .character {
                    width: 268px;
                    height: 318px;
                    /* margin-left: 24px; */
                    /* transform: scaleX(-1); */
                    position: relative;
                    img {
                        position: absolute;
                        top: -30px;
                        left: 0;
                        width: 100%;
                        z-index: 999;
                        height: calc(100% + 120px);
                    }
                }
                .contents {
                    height: 318px;
                    padding-top: 18px;
                    .text-box {
                        position: relative;
                        right: -12px;
                        width: 100%;
                        width: calc(100% - 12px);
                        font-family: 'Single Day';
                        color: #fff;
                        font-size: 20px;
                        font-weight: 400;
                        line-height: 25px;
                        padding: 8px 16px;
                        border-radius: 16px;
                        margin-bottom: 40px;
                        background: #ff9ad6;
                        box-shadow: 0px 4px 27px rgba(172, 77, 151, 0.25);
                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: -12px;
                            width: 0px;
                            height: 0px;
                            border-right: 15px solid #ff9ad6;
                            border-top: 18px solid rgba(0, 0, 0, 0);
                            border-bottom: 18px solid rgba(0, 0, 0, 0);
                        }
                    }
                    .mint-info {
                        .row {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-left: 80px;
                            margin-bottom: 40px;
                            div {
                                font-size: 36px;
                                color: #b74f87;
                                font-family: 'Squada One';
                                /* font-size: 18px; */
                                font-weight: 400;
                                line-height: 48px;
                                text-align: left;
                                &.right {
                                    color: rgba(222, 90, 137, 0.85);
                                    font-size: 40px;
                                    font-weight: 700;
                                    height: 49px;
                                    line-height: 49px;
                                    display: flex;
                                    align-items: center;
                                    &.publich {
                                        border: 1px solid #ff82cd;
                                        border-radius: 12px;
                                        overflow: hidden;
                                    }
                                    div {
                                        width: 49px;
                                        height: 49px;
                                        line-height: 45px;
                                        text-align: center;
                                        background: #ff82cd;
                                        cursor: pointer;
                                        font-size: 24px;
                                    }
                                    input {
                                        height: 49px;
                                        outline: none;
                                        border: none;
                                        text-align: center;
                                        font-size: 18px;
                                        width: 80px;
                                        font-weight: 400;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .btn {
                width: 100%;
                background: linear-gradient(269.42deg, #ff82cd 10.2%, rgba(217, 217, 217, 0) 121.81%);
                border-radius: 0px 0px 30px 30px;
                font-size: 44px;
                text-align: center;
                color: #ffffff;
                font-weight: 700;
                height: 90px;
                text-indent: 200px;
                line-height: 90px;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        min-height: 100%;
        background: url('../../../assets/images/home/minting-M.png') no-repeat center top/cover;
        .content {
            width: 95%;
            max-width: 650px;
            min-height: 350px;
            .action {
                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 15px;
                    .character {
                        width: 157px;
                        height: 260px;
                        margin-left: 0px;
                        img {
                            top: 0;
                            height: calc(100% + 6px);
                        }
                    }
                    .contents {
                        height: auto;
                        padding-top: 18px;
                        .text-box {
                            font-size: 14px;
                            line-height: 20px;
                        }
                        .mint-info {
                            .row {
                                margin-left: 20px;
                                margin-bottom: 30px;
                                div {
                                    font-size: 28px;
                                    &.right {
                                        font-size: 35px;
                                        div {
                                            width: 30px;
                                            height: 100%;
                                            line-height: 47px;
                                        }
                                        input {
                                            width: 50px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .btn {
                    font-size: 38px;
                    text-align: center;
                    color: #ffffff;
                    font-weight: 700;
                    height: 90px;
                    text-indent: 0;
                    line-height: 90px;
                }
            }
        }
    }
}
</style>
