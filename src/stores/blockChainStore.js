import { defineStore } from 'pinia';
import { ethers } from 'ethers';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

import abi_erc20 from './abi_erc20';
import abi_erc721 from './abi_erc721';
import abi_glc from './abi_glc';
import abi_airdrop from './abi_airdrop';

const infra_key = 'https://bsc-dataseed3.ninicoin.io';

export const sleep = (time = 5000) => {
    return new Promise(resolve => setTimeout(resolve, time));
};

export const getProvider = () => {
    if (!window.ethereum) {
        return new ethers.providers.JsonRpcProvider(infra_key);
    } else {
        return new ethers.providers.Web3Provider(window.ethereum, 'any');
    }
};

export const useBlockChain = defineStore('block-chain-store', {
    state() {
        return {
            // web3变量
            provider: undefined,
            account: '',
            chainId: 56,
            signer: undefined,

            // base
            contract_address: {
                56: {
                    glcContract: '0xf1154100517C7642411D012740010d51fA6F8666',
                    airdropContract: '0xF0b56a768F07c1055f98166b92947DCD1496598d',
                    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                    USDT: "0x55d398326f99059fF775485246999027B3197955",
                    WBNB_USDT: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
                    GLC: "0xcc780503e290274cfa8da085528067e259df58f0",
                    GLC_WBNB: "0x913a16d908c8b028dcae70c3316a9a5304d856cc",

                    GSS: "0x8185f8242d76cfd8afe02955bd42c32411737777",
                    GSS_USDT: "0x52088a3c88d16baad9fc225d58a9c9038603ca2e",

                },
                97: {
                    glcContract: '0x026389d29DA5A85536689d27d958e6dB2BC1234E',
                    airdropContract: '0xFD1Df4F9B1Ab065E44096149cF45728799c41ed0',
                },
            },

            link: {
                tg: 'https://t.me/GlieseCoin',
                tw: 'https://twitter.com/GlieseCoin2050',
            },
        };
    },

    actions: {
        async init_blockChain() {
            let provider = getProvider();
            this.provider = provider;
            if (!window.ethereum) {
                ElMessage({
                    showClose: true,
                    message: 'Metamask未安装',
                    type: 'error',
                    duration: 2000,
                });
                return;
            }

            // if (Number((await provider.getNetwork()).chainId) !== networkId) {
            //     ElMessage({
            //         showClose: true,
            //         message: '请选择正确的网络',
            //         type: 'error',
            //         duration: 2500,
            //     });
            // }
        },

        async connectWallet() {
            // if (Number((await this.provider.getNetwork()).chainId) !== 1 && this.firstLock) {
            //     ElMessage({
            //         showClose: true,
            //         message: '请连接正确的网络',
            //         type: 'error',
            //         duration: 2500,
            //     });
            // } else {
            //     this.firstLock = true;
            // }
            this.chainId = Number((await this.provider.getNetwork()).chainId);
            let accounts = await this.provider.send('eth_requestAccounts', []);
            this.account = accounts[0];
            this.signer = this.provider.getSigner();
        },

        getGlcContract() {
            return new ethers.Contract(this.contract_address[this.chainId].glcContract, abi_glc, this.signer);
        },
        getAirdropContract() {
            return new ethers.Contract(this.contract_address[this.chainId].airdropContract, abi_airdrop, this.signer);
        },

        async awaitTransactionMined(hash) {
            try {
                await sleep(15000);
                const res = await this.provider.getTransactionReceipt(hash);
                if (res.status) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                throw e;
            }
        },
        async approve(contract_address, token_address, amount) {
            try {
                const token = new ethers.Contract(token_address, abi_erc20, this.signer);
                const result = await token.approve(contract_address, amount);
                await sleep(15000);
                console.log('---', result);
                const res = await this.provider.getTransactionReceipt(result.hash);
                console.log('res ---', res);
                if (res.status) {
                    ElMessage({
                        showClose: true,
                        message: '授权成功',
                        type: 'success',
                        duration: 2500,
                    });
                    return res.status;
                } else {
                    throw 'approve fail';
                }
            } catch (e) {
                ElMessage({
                    showClose: true,
                    message: e?.reason ?? e?.message ?? '授权失败',
                    type: 'error',
                    duration: 2500,
                });
                throw e;
            }
        },
        async getAllowance(token_address, contract_address) {
            const token = new ethers.Contract(token_address, abi_erc20, this.signer);
            const allowance = await token.allowance(this.account, contract_address);
            return Number(ethers.utils.formatEther(allowance));
        },
        async getBalance(token_address, user) {
            let balance = 0;
            if (token_address.toLowerCase() === '0x0000000000000000000000000000000000000000') {
                balance = await this.provider.getBalance(user || this.account);
            } else {
                const token = new ethers.Contract(token_address, abi_erc20, this.signer);
                balance = await token.balanceOf(user || this.account);
            }
            return balance.toString();
        },
        async get721Balance(token_address, user) {
            let balance = 0;
            const token = new ethers.Contract(token_address, abi_erc721, this.signer);
            console.log('erc721 token', token)
            balance = await token.balanceOf(user || this.account);
            return balance.toString();
        },
        async getTokenDecimals(token_address) {
            const token = new ethers.Contract(token_address, abi_erc20, this.signer);
            console.log(await token.decimals());
            return await token.decimals();
        },
    },
});
