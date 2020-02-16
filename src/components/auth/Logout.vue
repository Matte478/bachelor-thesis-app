<template>
    <div></div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('destroyToken')
        .then(() => {
            this.$router.push({ name: 'home' });
            this.flashSuccess('Boli ste úspešne odhlásený.', {
                timeout: 3000,
            });
        })
    }
}
</script>