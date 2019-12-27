<template>
    <span>
        <v-app-bar :color="barColor" dark app>
            <!-- Hamburger -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon class="ml-2">
                <!-- должен быть скатик! -->
                <aqua-bast-icon
                    name="INFO"
                    size="40px"
                    color="white"
                ></aqua-bast-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary app>
            <!-- <v-list-item class="deep-purple accent-4">
                <v-list-item-avatar color="white">
                    <aqua-bast-icon
                        name="LOGO"
                        color="#01488A"
                    ></aqua-bast-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ phone }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ mail }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <div class="deep-purple accent-4 pa-2">
                <v-btn block rounded text>Выход из системы</v-btn>
            </div> -->

            <v-sheet :color="barColor" dark tile>
                <v-list-item>
                    <v-list-item-avatar color="white">
                        <aqua-bast-icon
                            name="LOGO"
                            color="#01488A"
                        ></aqua-bast-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ phone }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ mail }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <div class="pa-2">
                    <v-btn block rounded text>Выход из системы</v-btn>
                </div>
            </v-sheet>

            <v-list dense rounded>
                <template v-for="(item, i) in navDraverItems">
                    <v-row v-if="item.heading" :key="i" align="center">
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">{{
                                item.heading
                            }}</v-subheader>
                        </v-col>
                    </v-row>
                    <v-divider
                        v-else-if="item.divider"
                        :key="i"
                        dark
                        class="my-2"
                    />
                    <v-list-item v-else :key="i" :to="item.path" link>
                        <v-list-item-action>
                            <aqua-bast-icon
                                size="24px"
                                color="ab_color"
                                :name="item.icon"
                            ></aqua-bast-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <template v-slot:append>
                <v-list-item>
                    <div class="pa-2">
                        <v-switch
                            v-model="darkMode"
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
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';

export default {
    components: {
        AquaBastIcon
    },

    beforeMount() {
        this.darkMode = localStorage.getItem('darkMode') == 'true';
        this.$vuetify.theme.dark = this.darkMode;
    },

    watch: {
        darkMode(value) {
            localStorage.setItem('darkMode', value);
            this.$vuetify.theme.dark = value;
        }
    },

    computed: {
        title() {
            return 'AquaBast';
        },

        barColor() {
            return !this.$vuetify.theme.dark ? 'primary' : '';
        },

        name() {
            return this.$store.state.credentials.username;
        },

        phone() {
            let p = this.$store.state.credentials.phone;
            let c = ('' + p).replace(/\D/g, '');
            let a = c.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
            if (!a) {
                a = c.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
            }
            if (a) {
                return '+' + a[1] + ' (' + a[2] + ') ' + a[3] + '-' + a[4];
            }
            return null;
        },

        mail() {
            return this.$store.state.credentials.mail;
        }
    },

    data() {
        return {
            drawer: false,
            darkMode: false,
            navDraverItems: [
                // { divider: true },
                {
                    title: 'Журнал событий',
                    icon: 'journal',
                    path: 'journal'
                },
                {
                    title: 'Настройки',
                    icon: 'settings',
                    path: '/settings/application'
                },
                { divider: true },
                {
                    title: 'О программе',
                    icon: 'INFO',
                    path: 'about'
                }
            ]
        };
    }
};
</script>
