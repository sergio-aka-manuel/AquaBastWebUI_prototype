
<template>
    <v-content>
        <!-- <v-row justify="center">
            <div style="height: 100%">
                <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Use Google's location service?</v-card-title>
                        <v-card-text>
                            Let Google help apps determine location. This means
                            sending anonymous location data to Google, even when
                            no apps are running.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-row>-->
        <v-row justify="center">
            <v-card height="80vmin" width="90%">text</v-card>
        </v-row>
    </v-content>
    <!-- <v-content>
    <v-container class="fill-height" fluid>-->
    <!-- <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12" width="90%">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer />
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        :href="source"
                                        icon
                                        large
                                        target="_blank"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-code-tags</v-icon>
                                    </v-btn>
                                </template>
                                <span>Source</span>
                            </v-tooltip>
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        large
                                        href="https://codepen.io/johnjleider/pen/pMvGQO"
                                        target="_blank"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-codepen</v-icon>
                                    </v-btn>
                                </template>
                                <span>Codepen</span>
                            </v-tooltip>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    label="Login"
                                    name="login"
                                    prepend-icon="mdi-account"
                                    type="text"
                                />
                                <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-cellphone-iphone"
                                    type="password"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
    </v-row>-->
    <!-- </v-container>
    </v-content>-->
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        };
    }
};
</script>
