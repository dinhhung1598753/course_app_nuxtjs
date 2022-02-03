<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
  >
    <template #top>
      <v-toolbar flat>
        <!-- <v-toolbar-title class="text-uppercase">Tours</v-toolbar-title> -->
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="mb-2 bg-gradient-primary"
          dark
          @click="newAccount"
        >
          New course
        </v-btn>
      </v-toolbar>
    </template>

    <template #[`item.actions`]="{ item }">
      <!-- <v-icon small @click="viewTour(item)"> mdi-eye-outline </v-icon> -->
      <v-icon small @click="updateAccount(item)">
        mdi-square-edit-outline
      </v-icon>
      <v-icon small @click="deleteAccount(item)">
        mdi-trash-can-outline
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'AccountPage',
  
  data() {
    return {
      headers: [
        {
          text: 'Fullname',
          align: 'start',
          sortable: false,
          value: 'fullName',
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phoneNumber' },
        { text: 'Gender', value: 'gender' },
        { text: 'Role', value: 'role' },
        { text: 'Address', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [
        
      ],
      search: '',
    }
  },
  fetch() {
    try {
      this.$axios.get("/users").then((users) => (this.users = users.data));
    } catch (err) {
      return err;
    }
  },
  methods: {
    newAccount() {
      this.$router.push('/admin/account/new')
      //   if (this.$store.getters.isManager) {
      //     this.$router.push('/admin/account/new')
      //   } else {
      //     this.$swal.fire(
      //       'No Permission!',
      //       'Only manager can do this action!',
      //       'warning'
      //     )
      //   }
    },
    updateAccount() {
      if (this.$store.getters.isManager) {
        this.$router.push('/admin/account/update')
      } else {
        this.$swal.fire(
          'No Permission!',
          'Only manager can do this action!',
          'warning'
        )
      }
    },
    deleteAccount() {
      
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this account',
        icon: 'warning',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it !',
        cancelButtonText: 'No, cancel !',
        closeOnConfirm: false,
        closeOnCancel: false,
      }).then((willDelete) => {
        if (willDelete) {
            this.$swal('This account has been deleted!', {
              icon: 'success',
            })
        } 
      })
      //   if (this.$store.getters.isManager) {
      //     // this.$router.push('/admin/account/update')
      //     this.$swal.fire(
      //       'No Permission!',
      //       'Only manager can do this action!',
      //       'warning'
      //     )
      //   } else {
      //     this.$swal.fire(
      //       'No Permission!',
      //       'Only manager can do this action!',
      //       'warning'
      //     )
      //   }
    },
  },
  
}
</script>
