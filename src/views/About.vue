<template>
    <h2>About page</h2>
</template>


<script>
export default {
    computed: {
        counter() {
            return this.$store.state.count;
        }
    }
};
</script>
