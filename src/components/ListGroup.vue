<template>
    <div>
        <v-list-group
            v-for="item in items"
            :key="item.title"
            active-class="white--text"
            :prepend-icon="item.action"
            no-action
        >
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item
                v-for="(child, idx) in item.item"
                :key="'child'+ idx"
                :to="child.link"
                active-class="white--text"
                sub-group
            >
                <v-list-item-content>
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
    </div>
</template>

<script>
export default {
    props: {
        items: []
    }
}
</script>

<style scoped>

</style>