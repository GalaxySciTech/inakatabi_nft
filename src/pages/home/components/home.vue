<template>
    <div class="home">
        <div class="home-page">
            <section>
                <h5 style="font-family: BalooBhainaRegular;">INTRODUCTION</h5>
                <div class="cantion">
                    <div>
                        <div>
                            <p>Kiss Your Dream NFT, a PFP NFT project inspired by sleepless nights and friends plagued by insomnia.</p>
                            <!-- <h4>We will be minting on March 19 !!</h4> -->
                            <p>Kiss Your Dream NFT is a PFP NFT project, we are a hypnosis focused project, we hope to enable web3 users to have a completely relaxing sleep environment, later we will also launch our sleep app and smart wearable devices for our holders to use for free.</p>
                            <p>Hypnosis and ASMR is a very high quality field with a large group of demanders and audiences. Our vision is to expand our brand into an excellent global community for free communication, quality user experience, and convenient interaction design. With a relaxed atmosphere, we will continue to evolve and adapt, experimenting with different ways to grow our community.</p>
                            <p>Our team members have extensive experience in the art industry and the NFT industry. We cover different forms of art styles, including illustration, pop, comic and pixel art.</p>
                            <p>We believe in the future of web 3.0 and we remain a very good project that will work with some of our web 2.0 connections and resources to promote the mass adoption of the web 3.0 scene.</p>
                            <p>Our goal is to expand our team with more developers, artists and consultants to help bring kiss your dream into the metaverse and mainstream. Our goal is to create a space for our holders where we build a sleeping space that connects Web2 and Web3.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="version">
            <section>
                <div class="left">
                    <h5 style="font-family: BalooBhainaRegular;">Kiss Diary</h5>
                    <div class="cantion">
                        <div>
                            <div>
                                <!-- <h4>kiss Diary</h4> -->
                                <p class="time">November 2022</p>
                                <p>-KISS girl was born in the designer's mind</p>
                                <p class="time">January 2023</p>
                                <p>-The first final draft of KISS girl was released.</p>
                                <p>-Beryl came up with a project plan using ASMR as the theme.</p>
                                <p class="time">Feb 2023</p>
                                <p>-Website completed</p>
                                <p>-ASMR recording was done.</p>
                                <p>-Nemo, the artist, worked overtime on the artwork.</p>
                                <p class="time">Month 2023</p>
                                <p>- Minting date: March 19</p>
                                <p>-Mint price.</p>
                                <p>WLMINT: 0.09</p>
                                <p>WL price: 0.015</p>
                                <p>- KISS YOUR DREAM Hypnosis Series NFT</p>
                                <p>-reveal within 12 hours of release</p>
                                <p>-Open DC within 3 days after reveal and create holder exclusive area</p>
                                <p>Provide weekday hypnosis service and weekend bash for all holders</p>
                                <p>-DC open psychological consultation service</p>
                                <p>Second quarter of 2023</p>
                                <p>-Release exclusive ASMR software (including Android ios windows)</p>
                                <p>-Send the first physical peripherals of the project to holders (DHL global delivery)</p>
                                <p>- Announcing more peripherals for Q2</p>
                                <p>-Go live with pledge points play</p>
                                <p class="time">Third quarter of 2023</p>
                                <p>-- Host &lt;KISS YOUR DREAM Insomniacs Communication Party> in 5 cities around the world</p>
                                <p>- Delivery of sleep-aid wearables (headphones, bracelets, etc.)</p>
                                <p>- Digital gift boxes</p>
                                <p>TBD - in progress</p>
                                <p>- Web 3.0 sleep communication platform</p>
                                <p>- Web 3.0 Home Lifestyle Incubator</p>
                                <p>- KISS YOUR DREAM IP extension</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <h5 style="font-family: BalooBhainaRegular;">TEAM</h5>
                    <div class="team">
                        <div class="team-cont">
                            <div class="item">
                                <img src="../../../assets/images/home/01.png" alt="" />
                                <div>
                                    <p>Beryl</p>
                                    <p>Director</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/02.png" alt="" />
                                <div>
                                    <p>Linnys</p>
                                    <p>Director</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/03.png" alt="" />
                                <div>
                                    <p>Melo</p>
                                    <p>CMO</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/04.png" alt="" />
                                <div>
                                    <p>Nemo</p>
                                    <p>Art Director</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/05.png" alt="" />
                                <div>
                                    <p>DairyKid</p>
                                    <p>Sub Artist</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/06.png" alt="" />
                                <div>
                                    <p>ADai</p>
                                    <p>Sub Artist</p>
                                </div>
                            </div>
                            <div class="item">
                                <img src="../../../assets/images/home/01.png" alt="" />
                                <div>
                                    <p>Beryl</p>
                                    <p>Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { watch, onMounted, reactive, onBeforeUnmount, computed } from 'vue';
const loopTeam = () => {
    let index = 0;
    const dom = document.querySelector('.team-cont');
    setInterval(() => {
        index++;
        if (index === 6) {
            dom.style.marginLeft = `-${index * 100}%`;
            setTimeout(() => {
                dom.style.transition = 'none';
                dom.style.marginLeft = `0%`;
                index = 0;
                setTimeout(() => {
                    dom.style.transition = 'all 0.2s';
                });
            }, 2500);
        } else {
            dom.style.marginLeft = `-${index * 100}%`;
        }
    }, 3500);
};
onMounted(() => {
    setTimeout(() => {
        loopTeam();
    }, 2000);
});
</script>
<style scoped lang="scss">
.home {
    width: 100%;
    background: rgb(150, 181, 255);
    background: url('../../../assets/images/home/homebg-PC.png') no-repeat center top/cover;
    /* @media screen and (max-width: 1000px) {
        background: url('../../../assets/images/home/homebg-M.png') no-repeat center top/cover;
    } */
    .home-page {
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        margin-left: 5%;

        section {
            position: relative;
            margin-top: 10%;
            width: 50%;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0px 4px 4px #9b366f, inset 0px 4px 20px rgba(255, 164, 164, 0.56);
            backdrop-filter: blur(2.5px);
            border-radius: 30px;
            overflow: hidden;
            h5 {
                background: linear-gradient(90deg, #ff9fd5 6.2%, rgba(255, 255, 255, 0.2) 97.52%);
                font-weight: 400;
                font-size: 34px;
                height: 60px;
                line-height: 60px;
                color: #ffffff;
                text-indent: 40px;
            }
            .cantion {
                width: 100%;
                height: auto;
                padding: 36px 0 10px;

                & > div {
                    width: 100%;
                    height: auto;
                    font-weight: 400;
                    font-size: 24px;
                    padding: 0 60px 0 70px;
                    margin-bottom: 20px;
                    max-height: 55vh;
                    overflow-y: auto;
                    & > div {
                        background: linear-gradient(179.97deg, #d71f61 0.02%, #530c32 66.99%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                }
                p,
                h4 {
                    margin-bottom: 8px;
                }
                h4 {
                    font-size: 36px;
                }
            }
        }
    }
    .version {
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5%;
        section {
            width: 100%;
            display: flex;
            margin-top: 10%;
        }
        .left {
            position: relative;
            flex: 2;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0px 4px 4px #9b366f, inset 0px 4px 20px rgba(255, 164, 164, 0.56);
            backdrop-filter: blur(2.5px);
            border-radius: 30px;
            overflow: hidden;
            h5 {
                background: linear-gradient(90deg, #ff9fd5 6.2%, rgba(255, 255, 255, 0.2) 97.52%);
                font-weight: 400;
                font-size: 32px;
                height: 70px;
                line-height: 70px;
                color: #ffffff;
                text-indent: 25px;
            }
            .cantion {
                width: 100%;
                height: auto;

                padding: 30px 0 10px;
                text-align: center;
                & > div {
                    width: 100%;
                    height: auto;
                    font-weight: 400;
                    font-size: 22px;
                    padding: 0 30px;
                    margin-bottom: 20px;
                    height: 55vh;
                    overflow-y: auto;
                    & > div {
                        background: linear-gradient(179.97deg, #d71f61 0.02%, #530c32 66.99%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                }
                p,
                h4 {
                    margin-bottom: 8px;
                }
                h4 {
                    font-size: 32px;
                    font-weight: 900;
                }
            }
        }
        .right {
            margin-left: 5%;
            flex: 1.5;
            position: relative;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0px 4px 4px #9b366f, inset 0px 4px 20px rgba(255, 164, 164, 0.56);
            backdrop-filter: blur(2.5px);
            border-radius: 30px;
            overflow: hidden;
            h5 {
                background: linear-gradient(90deg, #ff9fd5 6.2%, rgba(255, 255, 255, 0.2) 97.52%);
                font-weight: 400;
                font-size: 32px;
                height: 70px;
                line-height: 70px;
                color: #ffffff;
                text-indent: 25px;
            }
            .team {
                width: 100%;
                height: calc(100% - 70px);
                /* overflow: hidden; */
                .team-cont {
                    width: 700%;
                    height: 100%;
                    display: flex;
                    margin-left: 0%;
                    transition: all 0.2s;
                }
                .item {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 52px;
                    box-sizing: border-box;
                    img {
                        border-radius: 50%;
                        width: 100%;
                        margin-bottom: 10px;
                    }
                    p {
                        font-family: 'Squada One';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 40px;
                        line-height: 45px;
                        text-align: center;
                        color: #7a325f;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .home-page {
            justify-content: center;
            margin-left: 0;
            section {
                width: 90%;
                h5 {
                    font-size: 30px;
                    height: 60px;
                    line-height: 60px;
                    text-indent: 20px;
                }
                .cantion {
                    padding: 20px 0 10px;
                    & > div {
                        font-size: 16px;
                        padding: 0 30px;
                        margin-bottom: 20px;
                        max-height: 50vh;
                        overflow-y: auto;
                        & > div {
                            background: linear-gradient(179.97deg, #d71f61 0.02%, #530c32 66.99%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        }
                    }
                    p,
                    h4 {
                        margin-bottom: 10px;
                    }
                    h4 {
                        font-size: 18px;
                        margin: 20px 0;
                    }
                }
            }
        }
        .version {
            padding: 0;
            justify-content: center;
            section {
                padding: 40% 0;
                width: 90%;
                flex-direction: column;
                justify-content: center;
            }
            .left {
                flex: 1;
                h5 {
                    font-size: 30px;
                    height: 60px;
                    line-height: 60px;
                    text-indent: 20px;
                }
                .cantion {
                    padding: 18px 0 25px;
                    & > div {
                        font-size: 18px;
                        line-height: 24px;
                        padding: 0 20px;
                        margin-bottom: 0;
                    }
                    p,
                    h4 {
                        margin-bottom: 16px;
                    }
                    h4 {
                        font-size: 26px;
                    }
                }
            }
            .right {
                margin-left: 0;
                margin-top: 30px;
                flex: 1;
                h5 {
                    font-size: 30px;
                    height: 60px;
                    line-height: 60px;
                    text-indent: 20px;
                }
                .team {
                    width: 100%;
                    height: auto;
                    .item {
                        padding: 30px 40px;
                        flex-direction: row;
                        img {
                            border-radius: 50%;
                            width: 90px;
                            height: 90px;
                            margin-right: 10px;
                            margin-bottom: 0;
                        }
                        div{
                            width: 100%;
                        }
                        p {
                            font-size: 30px;
                            line-height: 35px;
                        }
                    }
                }
            }
        }
    }
}
</style>
