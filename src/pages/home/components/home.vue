<template>
    <div class="home"></div>
</template>
<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    background: rgb(150, 181, 255);
    background: url('../../../assets/images/home/homebg-PC.png') no-repeat center top/cover;
    @media screen and (max-width: 1000px) {
        background: url('../../../assets/images/home/homebg-M.png') no-repeat center top/cover;
    }
}
</style>
