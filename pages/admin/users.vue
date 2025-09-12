<template>
  <v-container>
    <!-- Card container for the main content -->
    <v-card class="mx-auto" outlined>
      <v-card-title class="mb-2">
        <v-icon left>mdi-account-group</v-icon>
        จัดการผู้ใช้งานระบบ
        <v-spacer></v-spacer>
        <!-- Button to open the dialog for creating a new user -->
        <v-btn color="primary" elevation="2" @click="openDialog()">
          <v-icon left>mdi-plus-circle-outline</v-icon>
          เพิ่มผู้ใช้ใหม่
        </v-btn>
      </v-card-title>

      <!-- Data table to display users -->
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="กำลังโหลดข้อมูลผู้ใช้..."
        no-data-text="ไม่พบข้อมูลผู้ใช้งาน"
        class="elevation-1"
      >
        <!-- Custom slot for the 'actions' column -->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small class="mr-2" v-bind="attrs" v-on="on" @click="openDialog(item)">mdi-pencil</v-icon>
            </template>
            <span>แก้ไข</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small color="error" v-bind="attrs" v-on="on" @click="confirmDelete(item)">mdi-delete</v-icon>
            </template>
            <span>ลบ</span>
          </v-tooltip>
        </template>
        
        <!-- Custom slot to format the date -->
        <template v-slot:item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog for adding or editing a user -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedUser.username"
              :rules="[rules.required]"
              label="ชื่อผู้ใช้ (Username)"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <!-- Password field is only shown when creating a new user -->
            <v-text-field
              v-if="!editedUser.id"
              v-model="editedUser.password"
              :rules="[rules.required, rules.minLength]"
              label="รหัสผ่าน"
              type="password"
              prepend-icon="mdi-lock"
              required
            ></v-text-field>
            <v-select
              v-model="editedUser.role"
              :items="['user', 'admin']"
              :rules="[rules.required]"
              label="บทบาท (Role)"
              prepend-icon="mdi-account-key"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">ยกเลิก</v-btn>
          <v-btn color="primary" :disabled="!valid" @click="saveUser">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for delete confirmation -->
    <v-dialog v-model="deleteDialog" max-width="500px">
       <v-card>
        <v-card-title class="text-h5">ยืนยันการลบ</v-card-title>
        <v-card-text>คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ "{{ userToDelete.username }}" ? การกระทำนี้ไม่สามารถย้อนกลับได้</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDeleteDialog">ยกเลิก</v-btn>
          <v-btn color="red darken-1" text @click="deleteUserConfirmed">ยืนยันการลบ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
// Import mapActions from Vuex to call our API actions
import { mapActions } from 'vuex';

export default {
  // Use the default layout we defined
  layout: 'default',
  // IMPORTANT: This middleware protects the page, only admins can access it
  middleware: 'admin-auth',
  data() {
    return {
      // Component state variables
      loading: true,
      dialog: false,
      deleteDialog: false,
      valid: false,
      // Table headers definition
      headers: [
        { text: 'ID', align: 'start', value: 'id' },
        { text: 'ชื่อผู้ใช้', value: 'username' },
        { text: 'บทบาท', value: 'role' },
        { text: 'วันที่เข้าร่วม', value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      users: [], // Array to hold the user data from the API
      // Object to hold data for the user being edited or created
      editedUser: {
        id: null,
        username: '',
        password: '',
        role: 'user',
      },
      // Default state for the form
      defaultUser: {
        id: null,
        username: '',
        password: '',
        role: 'user',
      },
      userToDelete: {}, // Object to hold user info before deletion
      // Form validation rules
      rules: {
          required: value => !!value || 'จำเป็นต้องกรอกข้อมูลในช่องนี้',
          minLength: v => (v && v.length >= 6) || 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
      }
    };
  },
  computed: {
    // Dynamically set the dialog title based on whether we are editing or adding
    formTitle() {
      return this.editedUser.id ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้ใหม่';
    },
  },
  // This method runs when the component is created
  async created() {
    await this.loadUsers();
  },
  methods: {
    // Map Vuex actions to local methods for easy access
    ...mapActions(['fetchUsers', 'createUser', 'updateUser', 'deleteUser']),

    // Fetches users from the API and updates the local state
    async loadUsers() {
      this.loading = true;
      this.users = await this.fetchUsers();
      this.loading = false;
    },

    // Opens the dialog for adding or editing
    openDialog(user = null) {
      if (user) {
        // Edit mode: copy the user's data to the form
        this.editedUser = Object.assign({}, user);
      } else {
        // Add mode: reset the form to its default state
        this.editedUser = Object.assign({}, this.defaultUser);
      }
      this.dialog = true;
    },

    // Closes the add/edit dialog and resets the form
    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.$refs.form.resetValidation();
      });
    },

    // Handles saving a user (both create and update)
    async saveUser() {
      // Trigger form validation
      if (!this.$refs.form.validate()) return;

      let result;
      if (this.editedUser.id) {
        // Update existing user
        result = await this.updateUser(this.editedUser);
      } else {
        // Create new user
        result = await this.createUser(this.editedUser);
      }

      if (result.success) {
        this.closeDialog();
        await this.loadUsers(); // Refresh the user list
      } else {
        // In a real app, you would use a nicer notification component (e.g., a snackbar)
        alert(result.message);
      }
    },

    // Opens the delete confirmation dialog
    confirmDelete(user) {
        this.userToDelete = user;
        this.deleteDialog = true;
    },

    // Closes the delete confirmation dialog
    closeDeleteDialog() {
        this.deleteDialog = false;
        this.$nextTick(() => {
          this.userToDelete = {};
        });
    },

    // Deletes the user after confirmation
    async deleteUserConfirmed() {
      const result = await this.deleteUser(this.userToDelete.id);
       if (result.success) {
        this.closeDeleteDialog();
        await this.loadUsers(); // Refresh the user list
      } else {
        alert(result.message);
      }
    },

    // Helper function to format date strings
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    }
  },
};
</script>

