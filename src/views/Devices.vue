<template>
    <v-container>
        <v-card
            class="mb-2"
            color="default"
            :ripple="false"
            @click="expanded != getKey(component) ? expanded = getKey(component) : expanded = ''"
            v-for="(component, i) in _components"
            :key="i"
        >
            <!-- <v-scale-transition> -->
            <leakage-sensor-card-expanded
                :hostUid="$route.params.uid"
                :component="component"
                v-show="expanded == getKey(component)"
            ></leakage-sensor-card-expanded>
            <!-- </v-scale-transition> -->
            <!-- <v-scale-transition> -->
            <leakage-sensor-card
                :hostUid="$route.params.uid"
                :component="component"
                v-show="expanded != getKey(component)"
            ></leakage-sensor-card>
            <!-- </v-scale-transition> -->
        </v-card>
    </v-container>
</template>

<style scoped>
  .component-fade-enter-active,
  .component-fade-leave-active {
      transition: opacity 0.3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
                  /* .component-fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
  }
</style>

<script>
// expanded != getKey(component) ? expanded = getKey(component) : expanded = ''
import LeakageSensorCard from '@/components/LeakageSensorCard.vue';
import LeakageSensorCardExpanded from '@/components/LeakageSensorCardExpanded.vue';

export default {
    components: {
        LeakageSensorCard,
        LeakageSensorCardExpanded
    },

    methods: {
        getKey(component) {
            window.console.log('expanded = ' + this.expanded);

            return (
                component.uid + '.' + component.type + '#' + component.number
            );
        }
    },

    computed: {
        _components() {
            const uid = this.$route.params.uid;
            var dev = this.$store.state.devices.filter(function(d) {
                return d.uid == uid;
            });

            // window.console.log(d);
            return dev[0].components;
        }
    },

    data() {
        return {
            check: false,
            expanded: ''
        };
    }
};
</script>
