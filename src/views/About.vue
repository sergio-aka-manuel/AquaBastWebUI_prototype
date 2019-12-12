<template>
    <div class="about">
        <h1>This is an about page, counter : {{ counter }}</h1>
    </div>
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
