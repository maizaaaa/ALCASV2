import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { AdminUserService, AdminUser } from '../../services/admin-user.service';
import { SchoolService, School } from '../../services/school.service';
import { ProgramService, Program } from '../../services/program.service';

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
  schools: School[] = [];
  programs: Program[] = [];

  constructor(
    private router: Router,
    private adminUserService: AdminUserService,
    private schoolService: SchoolService,
    private programService: ProgramService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadSchools();
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

  loadSchools(): void {
    this.schoolService.getSchools().subscribe({
      next: (schools) => {
        this.schools = schools;
        console.log('SCHOOLS FROM BACKEND:', schools);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load schools:', error);
      },
    });
  }

  loadPrograms(schoolId: number): void {
    this.programService.getProgramsBySchool(schoolId).subscribe({
      next: (programs) => {
        this.programs = programs;
        console.log('PROGRAMS FROM BACKEND:', programs);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load programs:', error);
      },
    });
  }

  onSchoolChange(): void {
    if (this.userForm.schoolId) {
      this.userForm.programId = null;
      this.programs = [];

      this.loadPrograms(this.userForm.schoolId);
    }
  }

  // Filtering Logic
  get filteredUsers() {
    return this.users.filter((user) => {
      const matchesTab = this.activeTab === 'ALL' || user.role === this.activeTab;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.userId || '').toLowerCase().includes(searchLower);
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
      userId: '',
      name: '',
      email: '',
      role: 'STUDENT',
      password: '',
      phone: '',
      schoolId: null,
      programId: null,
      officeRoom: '',
      status: 'ACTIVE',
      lastLogin: 'Never',
    };

    this.showModal = true;
  }

  editUser(user: AdminUser) {
    this.isEditing = true;

    this.userForm = {
      ...user,
      schoolId: user.schoolId,
      programId: user.programId,
      officeRoom: user.officeRoom,
      phone: user.phone,
    };

    this.programs = [];

    if (user.schoolId) {
      this.loadPrograms(user.schoolId);
    }

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveUser() {
    if (!this.userForm.name || !this.userForm.email) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditing) {
      const updatedUser = {
        name: this.userForm.name,
        email: this.userForm.email,
        role: this.userForm.role,
        phone: this.userForm.phone,
        schoolId: this.userForm.schoolId,
        programId: this.userForm.programId,
        officeRoom: this.userForm.officeRoom,
      };

      this.adminUserService.updateUser(this.userForm.id, updatedUser).subscribe({
        next: (user) => {
          const index = this.users.findIndex((u) => u.id === user.id);

          if (index !== -1) {
            this.users[index] = user;
          }

          alert('User updated successfully!');

          this.closeModal();

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Failed to update user:', error);

          const message = error?.error?.message || 'Failed to update user.';

          alert(message);
        },
      });
    } else {
      // Validation for creating a new user
      if (
        !this.userForm.password ||
        !this.userForm.userId ||
        !this.userForm.phone ||
        !this.userForm.schoolId
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      if (
        this.userForm.role === 'STUDENT' &&
        !this.userForm.programId
      ) {
        alert('Please select a program.');
        return;
      }

      if (
        this.userForm.role === 'LECTURER' &&
        !this.userForm.officeRoom
      ) {
        alert('Please enter an office room.');
        return;
      }

      const newUser = {
        name: this.userForm.name,
        email: this.userForm.email,
        role: this.userForm.role,
        password: this.userForm.password,
        userId: this.userForm.userId,
        phone: this.userForm.phone,
        schoolId: this.userForm.schoolId,
        programId: this.userForm.programId,
        officeRoom: this.userForm.officeRoom,
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
