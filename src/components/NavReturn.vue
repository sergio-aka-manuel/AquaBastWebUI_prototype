<template>
    <v-app-bar :color="barColor" dark app>
        <!-- <v-icon ></v-icon> -->
        <v-btn @click.stop="$router.go(-1)" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="pl-2" style="width: 85%; font-size: 0.9rem;">{{
            title
        }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <aqua-bast-icon name="cloud" size="48px" color="white"></aqua-bast-icon>

        <v-btn icon class="ml-0">
            <!-- должен быть скатик! -->
            <aqua-bast-icon
                name="INFO"
                size="40px"
                color="white"
            ></aqua-bast-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';

export default {
    components: {
        AquaBastIcon
    },

    props: {
        title: [String]
    },

    computed: {
        barColor() {
            return !this.$vuetify.theme.dark ? 'primary' : '';
        }
    },

    data() {
        return {
            counter: 0
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
