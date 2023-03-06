<template>
    <div class="layout">
        <section>
            <header>
                <div class="left">
                    <!-- <img class="menu" @click="openDialog(true)" src="../assets/images/base/menu.png" alt="" /> -->
                    <img class="logo" src="../assets/images/base/logo.png" alt="" />
                </div>
                <div class="right">
                    <!-- <img class="lange" @click="setLange()" src="../assets/images/base/gload.png" alt="" /> -->
                    <div class="nav" :class="{ active: state.active === 'home' }" @click="jump('home')">
                        <img src="../assets/images/base/icon-menu1.png" alt="" />
                        HOME
                    </div>
                    <div class="nav" :class="{ active: state.active === 'version' }" @click="jump('version')">
                        <img src="../assets/images/base/icon-menu2.png" alt="" />
                        VISION
                    </div>
                    <div class="nav" :class="{ active: state.active === 'faq' }" @click="jump('faq')">
                        <img src="../assets/images/base/icon-menu3.png" alt="" />
                        FAQ
                    </div>
                    <div class="nav" :class="{ active: state.active === 'mint' }" @click="jump('mint')">
                        <img src="../assets/images/base/icon-menu4.png" alt="" />
                        MINT
                    </div>
                    <div class="address" @click="connectWallet()">{{ !!blockChain.account ? $hash(blockChain.account) : $t('connect wallet') }}</div>
                </div>

                <div class="dialog_menu" v-if="state.open">
                    <div class="mask" @click="openDialog(false)"></div>
                    <div class="main">
                        <div class="header">
                            <!-- <img src="../assets/images/home/001.png" alt="" /> -->
                        </div>
                        <div class="lib" @click="jump('')">NFT</div>
                        <div class="lib" @click="jump('https://www.gliesecoin.org/earn.html')">EARN</div>
                        <div class="lib" @click="jump('https://www.gliesecoin.org')">WEBSITE</div>

                        <div class="footers">
                            <a :href="blockChain.link.tg" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/discord.png" alt="" />
                            </a>
                            <a :href="blockChain.link.tg" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/opensea.png" alt="" />
                            </a>
                            <a :href="blockChain.link.tw" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/tw.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <router-view />
        </section>
    </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { useBlockChain } from '@/stores/blockChainStore';
import { $hash } from '@/utils';
import { useI18n } from 'vue-i18n';
import { ElButton, ElMessage } from 'element-plus';

export default {
    name: 'Layout',
    components: {},
    setup() {
        const { t, locale } = useI18n();
        const { proxy } = getCurrentInstance();
        let state = reactive({
            open: false,
            active: 'home'
        });
        const blockChain = useBlockChain();
        const openDialog = falg => {
            state.open = falg;
        };
        const connectWallet = () => {
            if (!blockChain.account) {
                blockChain.connectWallet();
            }
        };
        const setLange = () => {
            const lange = proxy.$i18n.locale === 'zh' ? 'en' : 'zh';
            proxy.$i18n.locale = lange;
            localStorage.setItem('lang', lange);
        };
        const jump = className => {
            state.active = className;
            document.querySelector(`.${className}`)
            .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            // state.open = false;
        };
        return {
            t,
            state,
            blockChain,
            openDialog,
            jump,
            connectWallet,
            $hash,
            setLange,
        };
    },
};
</script>

<style scoped lang="scss">
.layout {
    min-height: 100%;
    height: 100vh;
    width: 100%;
    position: relative;
    background: url('../assets/images/home/visionbg-PC.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 5;
        box-sizing: content-box;
        height: 110px;
        padding: 30px 20px 0;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        .left {
            display: flex;
            align-items: center;
            .menu {
                width: 35px;
                height: 35px;
                cursor: pointer;
                margin-right: 15px;
            }
            .logo {
                height: 80px;
            }
        }

        .right {
            display: flex;
            align-items: center;
            .lange {
                width: 30px;
                height: 30px;
                margin-right: 10px;
                cursor: pointer;
            }
            .nav {
                display: flex;
                align-items: center;
                font-size: 18px;
                line-height: 80px;
                margin-right: 38px;
                font-weight: 900;
                color: #000;
                cursor: pointer;
                &.active {
                    color: #fff;
                }
                img {
                    height: 38px;
                    margin-right: 8px;
                }
            }
            .address {
                min-width: 144px;
                padding: 0 20px;
                height: 40px;
                line-height: 40px;
                /* background: rgba(255, 255, 255, 0.5);
                border: 1px solid #fff;
                color: #1f1f1f; */
                background: linear-gradient(180deg, rgba(246, 74, 129, 0.9) 0%, rgba(255, 150, 183, 0.8) 100%);
                color: #000;
                font-weight: 600;

                border-radius: 20px;
                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .dialog_menu {
        /* position: sticky; */
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        min-height: 100vh;
        z-index: 99;
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
        }
        .main {
            position: absolute;
            width: 173px;
            height: 100%;
            left: 0;
            top: 0;
            background: #040217;
            .header {
                width: 100%;
                /* background: linear-gradient(0deg, #040217 0%, #b0762a 100%); */
                padding-top: 36px;
                text-align: center;
                margin-bottom: 40px;
                img {
                    margin: 0 auto 17px;
                    width: 95%;
                }
            }
            .lib {
                padding-left: 20px;
                height: 23px;
                display: flex;
                align-items: center;
                font-size: 16px;
                font-family: PingFang;
                font-weight: 500;
                color: #ffffff;
                margin-bottom: 27px;
                cursor: pointer;
                img {
                    width: 23px;
                    height: 23px;
                    margin-right: 9px;
                }
            }
            .footers {
                height: 32px;
                position: absolute;
                bottom: 64px;
                left: 0;
                width: 100%;
                padding: 0 40px;
                display: flex;
                justify-content: space-between;
                img {
                    height: 32px;
                }
            }
        }
    }
    section {
        height: 100%;
        overflow-y: auto;
    }
}
</style>
