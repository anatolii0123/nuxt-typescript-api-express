<script lang="ts">
import { Vue, Component, Prop, Emit, Ref, Model } from 'vue-property-decorator';
import { inject } from 'inversify-props';

import { ILoadingService } from '../services';
import { ICustomer } from '../models';

@Component
export default class CustomerAddComponent extends Vue {
  @inject('ILoadingService') private loadingService!: ILoadingService;

  @Ref('form') readonly form!: HTMLFormElement;
  @Prop({ type: Boolean, required: true }) readonly showDialog!: boolean;

  public isLoading: boolean = false;
  public customer = {
    name: '',
    email: '',
    balance: ''
  };
  public isFormValid: boolean = false;
  public rules = {
    name: [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && v.length <= 55) || 'Name must be less than 10 characters'
    ],
    email: [(v: any) => !!v || 'E-mail is required', (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
    balance: [(v: any) => !!v || 'Balance is required', (v: any) => (v && v >= 0) || 'Balance must be postive integer']
  };

  public mounted() {
    this.loadingService.$isLoading.subscribe(loading => (this.isLoading = loading));
  }

  @Emit()
  public add(event: any) {
    const form = this.$refs.form as any;
    let customer = { ...this.customer, balance: Number(this.customer.balance) };
    if (form.validate()) {
      this.close();
      return customer;
    }
  }

  public get dialog(): boolean {
    return this.showDialog;
  }

  public set dialog(value) {}

  @Emit()
  public close(): boolean {
    this.form && this.form.reset();
    // this.dialog = false;
    return true;
  }

  // public destroyed() {
  //   this.loadingService && this.loadingService.finish();
  // }
}
</script>

<style scoped></style>

<template>
  <v-dialog v-model="dialog" max-width="350px" @click:outside="close">
    <v-card :loading="isLoading">
      <v-card-title class="success white--text">Add New</v-card-title>
      <v-card-subtitle class="success white--text">User</v-card-subtitle>
      <v-form id="customerAddForm" ref="form" v-model="isFormValid" lazy-validation @submit.prevent="add($event)">
        <v-container>
          <v-text-field
            dense
            outlined
            v-model="customer.name"
            :counter="55"
            :rules="rules.name"
            label="User Name"
            required
          >
          </v-text-field>
          <v-text-field
            dense
            outlined
            v-model="customer.email"
            :rules="rules.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            type="number"
            dense
            outlined
            v-model="customer.balance"
            :rules="rules.balance"
            label="Balance"
            hint="Add a positive value"
            required
          ></v-text-field>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="close">Close</v-btn>
        <v-btn type="submit" form="customerAddForm" color="green darken" :disabled="!isFormValid || isLoading">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
