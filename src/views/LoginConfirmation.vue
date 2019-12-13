<template>
    <v-row justify="center">
        <span>
            <v-layout justify-center>
                <h2>Confirmation</h2>
            </v-layout>
            <v-layout justify-center>
                <img
                    alt="Under construction..."
                    src="../assets/animated-gifs-under-construction.gif"
                />
            </v-layout>
            <v-layout justify-center>
                <p>Code: {{ code }}</p>
            </v-layout>
        </span>
        <v-dialog v-model="show" persistent max-width="300px" width="75%">
            <!-- <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>-->
            <v-card>
                <v-card-title class="headline">
                    <span>Код из СМС:</span>
                    <v-spacer />
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    prepend-icon="mdi-apps"
                                    hint="шесть цифр из смс"
                                    v-model.number="code"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <!-- <small>*обязательные поля для заполнения</small> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="error" text @click="calcelLogin">Отмена</v-btn> -->
                    <v-btn color="primary" text block @click="proceedConfirm">ОК</v-btn>
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
        proceedConfirm: function _confirm() {
            // this.show = false;
            this.$router.push('dashboard');
        }
    },

    data() {
        return {
            show: false,

            code: null
        };
    }
};
</script>
