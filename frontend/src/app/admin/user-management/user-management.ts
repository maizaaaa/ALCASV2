import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { AdminUserService, AdminUser } from '../../services/admin-user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css'],
})
export class UserManagementComponent implements OnInit {
  searchQuery = '';
  activeTab = 'ALL';

  // --- MODAL STATE ---
  showModal = false;
  isEditing = false;

  // The object bound to our form inputs
  userForm: any = {
    id: '',
    name: '',
    email: '',
    role: 'STUDENT',
    status: 'ACTIVE',
    lastLogin: null,
  };

  // Mock Database
  users: AdminUser[] = [];

  constructor(
    private router: Router,
    private adminUserService: AdminUserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUserService.getUsers().subscribe({
      next: (users) => {
        console.log('USERS FROM BACKEND LENGTH:', users.length, users);

        this.users = users;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load users:', error);
      },
    });
  }

  // Filtering Logic
  get filteredUsers() {
    return this.users.filter((user) => {
      const matchesTab = this.activeTab === 'ALL' || user.role === this.activeTab;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toString().toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  toggleStatus(user: AdminUser): void {
    const newStatus: 'ACTIVE' | 'INACTIVE' = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    this.adminUserService.updateUserStatus(user.id, newStatus).subscribe({
      next: (updatedUser) => {
        user.status = updatedUser.status;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update user status:', error);
        alert('Failed to update user status.');
      },
    });
  }

  // --- MODAL ACTIONS ---

  addUser() {
    this.isEditing = false;

    this.userForm = {
      id: '',
      name: '',
      email: '',
      role: 'STUDENT',
      password: '',
      status: 'ACTIVE',
      lastLogin: 'Never',
    };

    this.showModal = true;
  }

  editUser(user: any) {
    this.isEditing = true;
    this.userForm = { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveUser() {
    if (!this.userForm.name || !this.userForm.email || !this.userForm.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditing) {
      const index = this.users.findIndex((u) => u.id === this.userForm.id);

      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          name: this.userForm.name,
          email: this.userForm.email,
          role: this.userForm.role,
        };
      }

      alert('User updated successfully!');
      this.closeModal();
    } else {
      const newUser = {
        name: this.userForm.name,
        email: this.userForm.email,
        role: this.userForm.role,
        password: this.userForm.password,
      };

      this.adminUserService.createUser(newUser).subscribe({
        next: (createdUser) => {
          this.users.unshift(createdUser);

          alert('New user added successfully!');

          this.closeModal();

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Failed to create user:', error);

          const message = error?.error?.message || 'Failed to create user.';

          alert(message);
        },
      });
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
