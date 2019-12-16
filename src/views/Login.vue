<template>
    <v-row justify="center">
        <span>
            <v-layout justify-center>
                <div>
                    <h2>Login page</h2>
                    <img
                        alt="Under construction..."
                        src="../assets/animated-gifs-under-construction.gif"
                    />
                    <p>Under construction</p>
                    <p>Phone: {{ phone }}</p>
                    <p>User: {{ name }}</p>
                    <p>Mail: {{ mail }}</p>
                </div>
            </v-layout>
        </span>
        <v-dialog v-model="show" persistent max-width="600px" width="90%">
            <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>-->
            <v-card>
                <v-card-title class="headline">
                    <span>{{ title }}</span>
                    <v-spacer />
                    <v-btn @click.stop="signIn = !signIn" class="ma-2">
                        <v-icon>{{buttonIcon}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <!-- <v-col cols="12" v-show="signIn">
                                <v-text-field
                                    prepend-icon="mdi-account"
                                    hint="Иванов Порфирий Сидорович"
                                    label="Имя пользователя*"
                                    v-model.number="name"
                                    required
                                ></v-text-field>
                            </v-col>-->
                            <v-col cols="12">
                                <v-text-field
                                    prepend-icon="mdi-phone-classic "
                                    hint="+7 (XXX) XXX-XXXX"
                                    label="Телефон*"
                                    v-model="phone"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" v-show="signIn">
                                <v-text-field
                                    prepend-icon="mdi-email "
                                    label="Электронная почта"
                                    hint="Для восстановления доступа"
                                    v-model.number="mail"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*поля, обязательные к заполнению</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="calcelLogin">Отмена</v-btn>
                    <v-btn color="primary" text @click="proceedLogin">ОК</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    mounted() {
        this.show = true;
    },

    methods: {
        proceedLogin: function _login() {
            // this.show = false;
            this.$router.push('confirm');
        },

        calcelLogin: function _cancel() {
            window.console.log('cancel login...');
        }
    },

    computed: {
        title() {
            if (this.signIn) return 'Регистрация:';
            else return 'Вход в систему:';
        },

        buttonIcon() {
            var icon;
            var dt = new Date();

            if (this.signIn) {
                icon = 'mdi-login';
            } else {
                icon = 'mdi-account-plus';
            }

            if (
                dt.getMonth() == 3 /* April */ &&
                dt.getDate() == 1 /* Fool`s Day */
            ) {
                window.console.log('Happy Fool`s Day!');
                icon += ' mdi-spin';
            }

            return icon;
        }
    },

    data() {
        return {
            show: false,
            signIn: true,

            phone: null,
            name: null,
            mail: null
        };
    }
};
</script>
