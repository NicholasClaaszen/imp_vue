<template>
    <div id="block-login">
        <div class="row">
            <div class="col-12 text-center">
                <img src="../assets/img/logo-grey.svg"/>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-sm-4 offset-sm-4 text-center">
                <h1>
                    Check je mailbox
                </h1>
                <p>
                    Je hebt zojuist via de mail een link om eenmalig mee in te loggen gekregen.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #block-login {
        padding-top: 70px;
    }
    img {
        width: 40%;
        margin-bottom: 50px;
    }
</style>
