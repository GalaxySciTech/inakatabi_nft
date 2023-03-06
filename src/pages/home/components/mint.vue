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
                                <div class="right">1</div>
                            </div>
                            <div class="row">
                                <div>Price</div>
                                <div class="right">FREE</div>
                            </div>
                        </div>
                        <!-- <div id="areaLoading" class="hide">
                            <img class="mint-loading" src="/images/icon-loading.png" alt="icon loading" />
                        </div> -->
                    </div>
                </div>
                <button class="btn" type="button">MINT NOW</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.mint {
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/home/minting-PC.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        width: 700px;
        height: auto;
        min-height: 500px;
        background: rgba(255, 255, 255, 0.65);
        border: 1px solid #fff;
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        border-radius: 20px;
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
}
</style>
