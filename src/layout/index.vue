<template>
    <div class="layout">
        <section>
            <header>
                <div class="left" :class="{ hidden: state.open }">
                    <img class="logo" src="../assets/images/base/logo.png" alt="" />
                </div>
                <div class="right" :class="{ hidden: state.open }">
                    <!-- <img class="lange" @click="setLange()" src="../assets/images/base/gload.png" alt="" /> -->
                    <div class="menu" @click="openDialog(true)">
                        <img src="../assets/images/base/menu.png" alt="" />
                    </div>

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
                    <div class="address" @click="connectWallet()">{{ !!blockChain.account ? $hash(blockChain.account, 4, 6) : $t('connect wallet') }}</div>
                </div>

                <div class="dialog_menu" v-if="state.open">
                    <div class="mask" @click="openDialog(false)"></div>
                    <div class="main">
                        <div class="header">
                            <img class="logo" src="../assets/images/base/logo.png" alt="" />
                            <div class="close" @click="openDialog(false)">
                                <img src="../assets/images/base/close.png" alt="" />
                            </div>
                        </div>
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

                        <div class="footers">
                            <a :href="blockChain.link.discord" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/discord.png" alt="" />
                            </a>
                            <a :href="blockChain.link.opensea" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/opensea.png" alt="" />
                            </a>
                            <a :href="blockChain.link.tw" target="_blank" rel="noopener noreferrer">
                                <img src="../assets/images/base/tw.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div class="links">
                <a :href="blockChain.link.discord" target="_blank" rel="noopener noreferrer">
                    <img src="../assets/images/base/discord.png" alt="" />
                </a>
                <a :href="blockChain.link.opensea" target="_blank" rel="noopener noreferrer">
                    <img src="../assets/images/base/opensea.png" alt="" />
                </a>
                <a :href="blockChain.link.tw" target="_blank" rel="noopener noreferrer">
                    <img src="../assets/images/base/tw.png" alt="" />
                </a>
            </div>
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
            active: 'home',
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
            state.open = false;
            document.querySelector(`.${className}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
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
    header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 5;
        box-sizing: content-box;
        height: 110px;
        padding: 10px 20px;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, #da6ea2 0%, rgba(255, 255, 255, 0.5) 160.06%);
        .hidden {
            display: none !important;
        }
        .left {
            display: flex;
            align-items: center;
            .logo {
                height: 80px;
            }
        }

        .right {
            display: flex;
            align-items: center;
            .menu {
                display: none;
                align-items: center;
                justify-content: center;
                width: fit-content;
                height: fit-content;
                padding: 8px;
                background: #ff8080;
                border-radius: 12px;
                cursor: pointer;
                margin-right: 14px;
                img {
                    width: 24px;
                    height: 24px;
                }
            }
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
                color: #fff;
                cursor: pointer;
                &.active {
                    color: #000;
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
                /* background: linear-gradient(180deg, rgba(246, 74, 129, 0.9) 0%, rgba(255, 150, 183, 0.8) 100%); */
                color: #fff;
                font-weight: 600;

                background: linear-gradient(180deg, rgba(222, 174, 185, 0.608) 0%, rgba(245, 139, 165, 0.8) 100%);
                box-shadow: 2px 2px 6px rgba(86, 18, 55, 0.65);
                backdrop-filter: blur(5px);

                border-radius: 20px;
                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                text-align: center;
                cursor: pointer;
            }
        }

        @media screen and (max-width: 1000px) {
            height: 80px;
            padding: 16px 10px;
            .left {
                .logo {
                    height: 48px;
                }
            }
            .right {
                .menu {
                    display: flex;
                }
                .nav {
                    display: none;
                }
                .address {
                    min-width: 80px;
                    padding: 0 14px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 20px;
                    font-size: 14px;
                    background: linear-gradient(180deg, rgba(#ff8080, 1) 30%, rgba(#f9c8c8, 0.9) 100%);
                    color: #fff;
                }
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
            /* background: rgba(0, 0, 0, 0.3); */
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(6px);
        }
        .main {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            padding: 16px;
            /* background: #040217; */
            .header {
                width: 100%;
                margin-bottom: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .logo {
                    height: 48px;
                }
                .close {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;
                    padding: 12px;
                    background: #ff8080;
                    border-radius: 16px;
                    cursor: pointer;
                    img {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
            .nav {
                display: flex;
                align-items: center;
                font-size: 20px;
                line-height: 24px;
                font-weight: 700;
                color: #000;
                cursor: pointer;
                padding: 16px 8px;
                margin-bottom: 24px;
                &.active {
                    color: #fff;
                }
                img {
                    height: 40px;
                    margin-right: 8px;
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
                padding: 0 120px;
                display: flex;
                justify-content: space-between;
                img {
                    height: 32px;
                }
            }
        }
    }
    .links {
        display: inline-block;
        position: fixed;
        bottom: 64px;
        right: 0;
        padding: 14px 20px;
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(6px);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        z-index: 9;
        a {
            display: block;
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        img {
            height: 32px;
        }
    }
    section {
        height: 100%;
        overflow-y: auto;
    }
    @media screen and (max-width: 1000px) {
        .links {
            display: none;
        }
    }
}
</style>
