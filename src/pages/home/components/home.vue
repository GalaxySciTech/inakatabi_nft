<template>
    <div class="home">
        <div class="home-page">
            <section>
                <h5>INTRODUCTION</h5>
                <div class="cantion">
                    <div>
                        <div>
                            <p>Kiss Your Dream NFT, a PFP NFT project inspired by sleepless nights and friends plagued by insomnia.</p>
                            <h4>We will be minting on March 19 !!</h4>
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
            <div class="left">
                
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>
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
        justify-content: center;
        align-items: center;

        section {
            position: relative;
            left: -20%;
            margin-top: 10%;
            width: 60%;
            margin-left: 10%;
            background: rgba(255, 255, 255, 0.7);
            box-shadow: 0px 4px 4px #9b366f, inset 0px 4px 20px rgba(255, 164, 164, 0.56);
            backdrop-filter: blur(2.5px);
            border-radius: 30px;
            overflow: hidden;
            h5 {
                background: linear-gradient(90deg, #ff9fd5 6.2%, rgba(255, 255, 255, 0.2) 97.52%);
                font-weight: 400;
                font-size: 64px;
                height: 81px;
                line-height: 81px;
                color: #ffffff;
                text-indent: 72px;
            }
            .cantion {
                width: 100%;
                height: auto;
                padding: 44px 0;

                & > div {
                    width: 100%;
                    height: auto;
                    font-weight: 400;
                    font-size: 32px;
                    padding: 0 60px 0 80px;
                    margin-bottom: 20px;
                    max-height: 60vh;
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
                }
                h4 {
                    font-size: 36px;
                }
            }
        }
    }
}
</style>
