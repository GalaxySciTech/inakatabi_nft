<template>
    <div class="mint">
        <div class="content">
            <div class="header">
                <div class="state">
                    <div class="areaMintStatus">NOT FOR SALE</div>
                </div>
                <div class="cont">
                    <img src="../../../assets/images/home/Logo_Minting.png" alt="" />
                </div>
            </div>
            <div class="action">
                <div class="top">
                    <img class="character" src="../../../assets/images/home/faq-mint.png" alt="mint img" />
                    <div class="contents">
                        <div class="text-box">My heart won't stop beating from the fact that I'm in another world!</div>
                        <div class="mint-info">
                            <div class="row">
                                <div>Amount</div>
                                <!-- <div class="right">1</div> -->
                                <div class="right">1</div>
                            </div>
                            <div class="row">
                                <div>Price</div>
                                <div class="right">{{ state.price }}</div>
                            </div>
                        </div>
                        <!-- <div id="areaLoading" class="hide">
                            <img class="mint-loading" src="/images/icon-loading.png" alt="icon loading" />
                        </div> -->
                    </div>
                </div>
                <el-button class="btn" :loading="state.loadding" data-mdb-ripple="true" data-mdb-ripple-color="light">MINT NOW</el-button>
                <!-- <el-button class="btn" :disabled="" :loading="" data-mdb-ripple="true" data-mdb-ripple-color="light" @click="() => {}">MINT NOW</el-button> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { watch, onMounted, reactive, onBeforeUnmount } from 'vue';
import { useBlockChain } from '@/stores/blockChainStore';
import { ElButton, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
// import { MerkleTree } from 'merkletreejs';
// import keccak256 from 'keccak256';

import { $hash, $shiftedBy, $shiftedByToBig, $copy, $toFixed, $shiftedByString, $dealTimes, $number, $shiftedByFixed } from '@/utils';
const Web3 = require('web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let timer = null;
const web3 = new Web3('');
const { t } = useI18n();
const state = reactive({
    currentIsPublich: false,
    price: '--',
    publichMaxNumber: 2,
    publichMaxNumber: 2,
    ethBalance: 0,
    loadding: false,
    iswlMinted: true,
    // privateNum: 0,
    // privateNum: 0,
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

const getBalance = async () => {
    const balance = await blockChain.getBalance('0x0000000000000000000000000000000000000000');
    state.ethBalance = $shiftedBy(balance.toString(), -18, 6);
};

const getPublicStartTime = async () => {
    const contract = blockChain.getContract();
    const publicStartTime = await contract.publicStartTime();
    state.currentIsPublich = publicStartTime.toString() >= Math.floor(Date.now() / 1000);
    let price;
    if (state.currentIsPublich) {
        price = await contract.publicPrice();
    } else {
        price = await contract.wlPrice();
        state.iswlMinted = await contract.wlMinted(blockChain.account);
    }
    state.price = $shiftedBy(price.toString(), -18, 6);
    console.log('publicStartTime:::', publicStartTime.toString());
    console.log('price:::', price, $shiftedBy(price.toString(), -18, 6));
};

function address() {
    const params = [
        // '0xa027d231d6852F8986409DccC58908D83a48169F', 
        // '0x619B75f4D55285741a24b047944FBdF27E49f9d1'
        '0xa027d231d6852F8986409DccC58908D83a48169F',
        '0xd4D75e2eB480D61822B9cA40EB54cb322F08d920',
        '0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5',
        '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        '0x8b8a11755a3f2B9f2cE384bc42Cb25053Eb4FF33',
        '0xd2Ece3F5A7738E4B14c13C0336E3e879755FCd77'
    ];
    let leaves = params.map(x => web3.utils.soliditySha3(web3.utils.toChecksumAddress(x)));
    let tree = new MerkleTree(leaves, keccak256, { sort: true });
    let root = tree.getHexRoot();
    const leaf = web3.utils.soliditySha3('0xa027d231d6852F8986409DccC58908D83a48169F');
    const proof = tree.getHexProof(leaf);
    console.log('address leaf::', leaf);
    console.log('address root::', root);
    console.log('address proof::', proof);
}

const mint = async () => {
    const WhiteList = [
        // '0xa027d231d6852F8986409DccC58908D83a48169F',
        // '0x619B75f4D55285741a24b047944FBdF27E49f9d1',
        '0xa027d231d6852F8986409DccC58908D83a48169F',
        '0xd4D75e2eB480D61822B9cA40EB54cb322F08d920',
        '0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5',
        '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        '0x8b8a11755a3f2B9f2cE384bc42Cb25053Eb4FF33',
        '0xd2Ece3F5A7738E4B14c13C0336E3e879755FCd77'
    ];

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
        mint();
        // address();
        getBalance();
        getPublicStartTime();
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
.mint {
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/home/minting-T.png') no-repeat center top/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 850px;
    .content {
        width: 700px;
        height: auto;
        min-height: 500px;
        background: rgba(255, 255, 255, 0.65);
        border: 1px solid #fff;
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        border-radius: 20px;
        position: relative;
        top: 7%;
        /* position: absolute; */
        .header {
            position: relative;
            background: rgba(255, 255, 255, 0.95);
            border-top: 1px solid #fff;
            border-bottom: 1px solid #fff;
            /* overflow: hidden; */
            padding: 10px 0;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            /* border: 20px; */
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
                border-top: 1px dashed #c4c4c4;
                border-bottom: 1px dashed #c4c4c4;
                img {
                    height: 90px;
                }
            }
        }
        .action {
            margin: 40px 0 32px;
            padding: 0 32px;
            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .character {
                    width: 168px;
                    height: 318px;
                    margin-left: 24px;
                    transform: scaleX(-1);
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
                        background: #545454;
                        border-radius: 16px;
                        margin-bottom: 40px;
                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: -12px;
                            width: 0px;
                            height: 0px;
                            border-right: 15px solid #545454;
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
                                color: #3f3f3f;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                &.right {
                                    color: #1f1f1f;
                                    font-size: 40px;
                                    font-weight: 700;
                                    line-height: 49px;
                                }
                            }
                        }
                    }
                }
            }
            .btn {
                width: 100%;
                padding: 16px;
                background: #ff8080;
                border-radius: 15px;
                color: #1f1f1f;
                font-size: 18px;
                font-weight: 700;
                line-height: 20px;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        min-height: 100%;
        background: url('../../../assets/images/home/minting-M.png') no-repeat center top/cover;
        .content {
            width: 95%;
            max-width: 650px;
            border-radius: 20px;
            .action {
                margin: 40px 0 32px;
                padding: 0 15px;
                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .character {
                        width: 127px;
                        height: 290px;
                        margin-left: 0px;
                        transform: scaleX(-1);
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
                                    font-size: 18px;
                                    &.right {
                                        font-size: 35px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
