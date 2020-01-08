<template>
    <span>
        <v-app-bar v-if="!hide" color="aquabast_blue" dark app>
            <!-- Hamburger button -->
            <v-app-bar-nav-icon
                v-if="$route.path == '/'"
                @click.stop="drawer = !drawer"
            />
            <!-- Left Arrow button -->
            <v-btn v-else @click.stop="$router.go(-1)" icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- mqtt indicator -->
            <svg-icon name="cloud" size="36px" color="white" />

            <!-- help button -->
            <v-btn icon class="ml-2" @click.stop="$emit('help-button-click')">
                <svg-icon name="INFO" size="40px" color="white" />
            </v-btn>

            <template v-slot:extension v-if="tabs">
                <v-tabs
                    v-model="tab"
                    @change="$emit('tab-selected', tab)"
                    background-color="aquabast_blue"
                    grow
                    value="1"
                >
                    <v-tabs-slider color="warning"></v-tabs-slider>
                    <v-tab
                        v-for="(item, i) in tabs"
                        :href="'#' + item.name"
                        :key="i"
                        class="priamary--text"
                    >
                        <svg-icon :name="item.icon" size="36px" color="white" />
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-if="!hide"
            v-model="drawer"
            :dark="$vuetify.theme.dark"
            temporary
            app
        >
            <template v-slot:prepend>
                <v-sheet color="aquabast_blue" dark tile>
                    <v-list-item>
                        <v-list-item-avatar
                            color="white"
                            height="48px"
                            width="48px"
                        >
                            <svg-icon name="LOGO" color="aquabast_blue" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="name" />
                            <v-list-item-subtitle v-text="phone" />
                            <v-list-item-subtitle v-text="mail" />
                        </v-list-item-content>
                    </v-list-item>
                    <div class="pa-2">
                        <v-btn block rounded text>Выход из системы</v-btn>
                    </div>
                </v-sheet>
            </template>

            <!-- application menu -->
            <v-list v-if="menu" dense rounded>
                <template v-for="(item, i) in menu">
                    <v-subheader v-if="item.heading" :key="i">
                        {{ item.heading }}
                    </v-subheader>

                    <v-divider v-else-if="item.divider" :key="i" class="my-2" />

                    <v-list-item v-else link :to="item.path" :key="i">
                        <v-list-item-action>
                            <svg-icon
                                :color="
                                    $vuetify.theme.dark
                                        ? 'secondary'
                                        : 'primary'
                                "
                                :name="item.icon"
                                size="24px"
                            />
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <!-- dark mode switch -->
            <template v-slot:append>
                <v-list-item>
                    <div class="pa-2">
                        <!-- TODO: svg-icon -->
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            append-icon="mdi-weather-night"
                            label="Ночной режим"
                        />
                    </div>
                </v-list-item>
            </template>
        </v-navigation-drawer>
    </span>
</template>

<script>
import SvgIcon from '@/components/Svg/Icon.vue';

export default {
    components: {
        SvgIcon
    },

    props: {
        title: {
            type: String,
            default: 'AquaBast'
        },
        menu: {
            type: Array,
            default: null
        },
        tabs: {
            type: Array,
            default: null
        },
        hide: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        if (this.tabs) this.tab = this.tabs[1].name;
    },

    computed: {
        // Credentials
        name() {
            const name = this.$store.state.credentials.name;
            return name == '' ? null : name;
        },

        mail() {
            const mail = this.$store.state.credentials.mail;
            return mail == '' ? null : mail;
        },

        phone() {
            const p = this.$store.state.credentials.phone;
            let c = ('' + p).replace(/\D/g, '');
            let a = c.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
            if (!a) {
                a = c.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
            }
            return a
                ? '+' + a[1] + ' (' + a[2] + ') ' + a[3] + '-' + a[4]
                : null;
        }
    },

    data() {
        return {
            drawer: false,
            tab: ''
        };
    }
};
</script>
