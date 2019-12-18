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
                    _icon.symbol += 'mdi-battery-30';
                    break;

                case 2:
                    _icon.symbol += 'mdi-battery-70';
                    break;

                case 3:
                    _icon.symbol += 'mdi-battery';
                    break;

                case 4:
                    _icon.symbol += 'mdi-battery-charging';
                    break;

                default:
                    if (this.level == 0) {
                        _icon.symbol += 'mdi-battery-outline';
                    } else {
                        _icon.symbol += 'mdi-battery-unknown';
                    }
                    _icon.color = 'error';
                    break;
            }
            return _icon;
        }
    }
};
</script>
