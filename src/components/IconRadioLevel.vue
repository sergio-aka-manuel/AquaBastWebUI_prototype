<template>
    <v-icon :color="icon.color">{{ icon.symbol }}</v-icon>
</template>

<style scoped>
</style>

<script>
export default {
    props: {
        level: [Number, String]
    },

    computed: {
        icon() {
            var _icon = {
                symbol: '',
                color: 'normal'
            };

            switch (this.level) {
                case 1:
                    _icon.symbol += 'mdi-signal-cellular-1';
                    break;

                case 2:
                    _icon.symbol += 'mdi-signal-cellular-2';
                    break;

                case 3:
                    _icon.symbol += 'mdi-signal-cellular-3';
                    break;

                default:
                    if (this.level == 0) {
                        _icon.symbol += 'mdi-signal-cellular-outline';
                    } else {
                        _icon.symbol += 'mdi-signal-off';
                    }
                    _icon.color = 'error';
                    break;
            }
            return _icon;
        }
    }
};
</script>
