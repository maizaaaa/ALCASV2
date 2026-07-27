import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

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
    lastLogin: 'Never',
  };

  // Mock Database
  users = [
    {
      id: 'S12345',
      name: 'Nur Amirah',
      email: 'amirah@student.uum.edu.my',
      role: 'STUDENT',
      status: 'ACTIVE',
      lastLogin: 'Today, 10:00 AM',
    },
    {
      id: 'L98765',
      name: 'Dr. Ahmad Fauzi',
      email: 'ahmad.fauzi@uum.edu.my',
      role: 'LECTURER',
      status: 'ACTIVE',
      lastLogin: 'Yesterday',
    },
    {
      id: 'S12346',
      name: 'Jason Lee',
      email: 'jason@student.uum.edu.my',
      role: 'STUDENT',
      status: 'INACTIVE',
      lastLogin: '2 weeks ago',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Filtering Logic
  get filteredUsers() {
    return this.users.filter((user) => {
      const matchesTab = this.activeTab === 'ALL' || user.role === this.activeTab;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  toggleStatus(user: any) {
    user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  }

  // --- MODAL ACTIONS ---

  addUser() {
    this.isEditing = false;
    // Reset form for new user
    this.userForm = {
      id: '',
      name: '',
      email: '',
      role: 'STUDENT',
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
    if (!this.userForm.name || !this.userForm.email || !this.userForm.id) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditing) {
      const index = this.users.findIndex((u) => u.id === this.userForm.id);
      if (index !== -1) {
        this.users[index] = { ...this.userForm };
      }
      alert('User updated successfully!');
    } else {
      this.users.unshift({ ...this.userForm });
      alert('New user added successfully!');
    }

    this.closeModal();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
