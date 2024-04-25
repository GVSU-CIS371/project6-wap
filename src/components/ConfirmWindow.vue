<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Confirm Action</v-card-title>
        <v-card-text>
          Are you sure you want to perform this action?
        </v-card-text>
        <v-card-actions justify="space-evenly">
          <v-btn color="red darken-1" @click="cancel">Cancel</v-btn>
          <v-btn color="green darken-1" @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      value: Boolean,
    },
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      confirm() {
        this.$emit('confirm');
        this.dialog = false;
      },
      cancel() {
        this.$emit('cancel');
        this.dialog = false;
      },
    },
  };
  </script>