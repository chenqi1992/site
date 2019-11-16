<template>
    <div class="copyright">
    	<span>&copy; 版权所有</span>
        <span>号</span>
        <a href="saasconfig.footer.beiancodelink" class="beian" target="_blank">
            <!-- <img src="@/module/index/assets/common/beian.png" alt="'备案_'+saasconfig.easywebsitename"/> -->
        </a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: {

        },
        components: {

        },
        methods: {

        },
    }
</script>
<style lang="scss" scoped>
    .copyright {
        position: fixed;
        width: 100%;
        bottom: 0;
        text-align: center;
        padding: 25px 0;
        span,
        a {
            display: inline-block;
            font-size: 12px;
            color: #888;
            padding: 0 10px;
        }
        .beian {
            position: relative;
            padding-left: 28px;
            img {
                position: absolute;
                left: 8px;
                top: -4px;
            }
        }
    }
</style>
