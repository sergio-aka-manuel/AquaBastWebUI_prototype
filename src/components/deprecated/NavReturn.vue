<template>
    <v-app-bar :color="background" dark app>
        <v-btn @click.stop="$router.go(-1)" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="pl-2" style="width: 85%;">
            {{ title }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <svg-icon name="cloud" size="48px" color="white" />

        <v-btn icon class="ml-0" @click.stop="$emit('help-button-click')">
            <!-- должен быть скатик! -->
            <svg-icon name="INFO" size="40px" color="white" />
        </v-btn>

        <template v-slot:extension v-if="tabs">
            <v-tabs
                fixed-tabs
                v-model="tab"
                :background-color="background"
                @change="$emit('tab-changed', tab)"
            >
                <v-tabs-slider color="warning"></v-tabs-slider>
                <v-tab
                    v-for="(item, i) in tabs"
                    :href="'#' + item.name"
                    :key="i"
                    class="priamary--text"
                >
                    <!-- <v-badge overlap color="orange">
                        <template v-slot:badge>
                            <span style="font-size: 1em">2</span>
                        </template> -->
                    <svg-icon :name="item.icon" size="36px" color="white" />
                    <!-- </v-badge> -->
                </v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>

<script>
import SvgIcon from '@/components/Svg/Icon.vue';

export default {
    components: {
        SvgIcon
    },

    props: {
        title: [String],
        tabs: [Array]
    },

    computed: {
        background() {
            return !this.$vuetify.theme.dark ? 'primary' : '';
        }
    },

    data() {
        return {
            tab: null
        };
    }
};

// <v-app-bar app>
//     <!-- <v-icon ></v-icon> -->
//     <v-btn @click.stop="$router.push('/')" icon>
//         <v-icon>mdi-arrow-left</v-icon>
//     </v-btn>

//     <!-- <v-toolbar-title>Речная 113, кв.91</v-toolbar-title> -->

//     <v-list-item three-line>
//         <v-list-item-content>
//             <v-list-item-title>{{ _device.name }}</v-list-item-title>
//             <!-- <v-list-item-subtitle>квартира, две строки текста помещаются</v-list-item-subtitle> -->
//         </v-list-item-content>
//     </v-list-item>

//     <v-spacer></v-spacer>

//     <aqua-bast-icon
//         name="cloud"
//         size="56px"
//         color="secondary"
//     ></aqua-bast-icon>

//     <v-btn icon class="ml-2">
//         <!-- должен быть скатик! -->
//         <aqua-bast-icon
//             name="INFO"
//             size="40px"
//             color="primary"
//         ></aqua-bast-icon>
//     </v-btn>
// </v-app-bar>
</script>

<style scoped></style>
