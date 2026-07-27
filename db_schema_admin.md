# ALCAS Admin Section - Database Schema Design

This document details the database tables, fields, types, and constraints necessary to support all functions in the Admin section of the Academic Lecturer Consultation Appointment System (ALCAS).

---

## 1. Users Table (Core Identity)
Stores core authentication and identity data for all roles (Students, Lecturers, and Admins) to manage credentials and roles centrally.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID / INT | PK, Auto Increment | Unique identifier for each user |
| `name` | VARCHAR(100) | NOT NULL | Full name of the user |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Institutional email address (used for login) |
| `password_hash`| VARCHAR(255) | NOT NULL | Securely hashed password |
| `role` | ENUM | NOT NULL | Role type: `'admin'`, `'lecturer'`, `'student'` |
| `status` | ENUM | NOT NULL, DEFAULT `'active'` | User status: `'active'`, `'inactive'`, `'suspended'` |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date and time the account was created |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Date and time of the last profile update |

---

## 2. Students Profile Table (Extended Student Data)
Stores student-specific academic information, linked to the core Users table.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID / INT | FK (Users.id), UNIQUE | Links back to the core user record |
| `matric_number`| VARCHAR(20) | NOT NULL, UNIQUE | University Matric Card / ID Number |
| `faculty` | VARCHAR(100) | NOT NULL | Academic faculty (e.g., Computer Science) |
| `specialization`| VARCHAR(100) | NOT NULL | Specific major/specialization (e.g., Software Engineering) |
| `profile_img` | VARCHAR(255) | NULL | Filepath/URL to student's profile picture |

---

## 3. Lecturers Profile Table (Extended Lecturer Data)
Stores lecturer-specific details such as office location, department, and available hours.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID / INT | FK (Users.id), UNIQUE | Links back to the core user record |
| `staff_number` | VARCHAR(20) | NOT NULL, UNIQUE | University Staff ID Number |
| `department` | VARCHAR(100) | NOT NULL | Department/Division (e.g., Information Systems) |
| `office_room` | VARCHAR(50) | NOT NULL | Lecturer's physical office (e.g., Room C-304) |

---

## 4. Consultations Table (Consultation Logs)
Records all appointment requests, schedule coordinates, statuses, and consultation notes.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(20) | PK | Unique consultation ID (e.g., `'REQ-8921'`) |
| `student_id` | UUID / INT | FK (Users.id) | Student booking the consultation |
| `lecturer_id` | UUID / INT | FK (Users.id) | Lecturer conducting the session |
| `scheduled_date`| DATE | NOT NULL | Date of the scheduled session |
| `scheduled_time`| VARCHAR(20) | NOT NULL | Time slot (e.g., `'09:00 AM'`) |
| `topic` | VARCHAR(255) | NOT NULL | Title/Topic of discussion |
| `room` | VARCHAR(50) | NOT NULL | Venue or virtual link |
| `status` | ENUM | NOT NULL, DEFAULT `'Pending'` | Status: `'Pending'`, `'Confirmed'`, `'Completed'`, `'No-Show'`, `'Cancelled'` |
| `cancel_reason`| TEXT | NULL | Stored reason if the consultation is cancelled |
| `notes` | TEXT | NULL | Remarks, summaries, or details from the session |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date and time the request was submitted |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Date and time of status updates |

---

## 5. Attendance Table
Tracks attendance records for completed consultation sessions, managed by lecturers or admins.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | Unique record ID |
| `appointment_id`| VARCHAR(20) | FK (Consultations.id) | Link to the corresponding appointment |
| `student_id` | UUID / INT | FK (Users.id) | Link to the student user |
| `status` | ENUM | NOT NULL | Attendance status: `'Present'`, `'Absent'`, `'Late'` |
| `marked_by` | UUID / INT | FK (Users.id) | ID of the lecturer/admin who marked attendance |
| `marked_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Exact date and time attendance was recorded |
| `remarks` | VARCHAR(255) | NULL | Additional attendance notes (e.g., doctor's note provided) |

---

## 6. Broadcasts Table (Announcements Hub)
Contains announcement logs published by admins to lecturers and/or students.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | Unique announcement ID |
| `title` | VARCHAR(150) | NOT NULL | Header/Title of the announcement |
| `content` | TEXT | NOT NULL | Body content of the announcement |
| `target_audience`| ENUM | NOT NULL | Direct recipient group: `'All'`, `'Students'`, `'Lecturers'` |
| `created_by` | UUID / INT | FK (Users.id) | Admin who published the announcement |
| `status` | ENUM | NOT NULL, DEFAULT `'Published'`| Status: `'Draft'`, `'Published'` |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Time of publication |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Time of last edit |

---

## 7. System Settings Table
Configuration store for system-wide parameters and business rules.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `setting_key` | VARCHAR(100) | PK | Parameter name (e.g., `'cancellation_buffer_hours'`) |
| `setting_value`| VARCHAR(255) | NOT NULL | Config value (e.g., `'24'`) |
| `description` | TEXT | NULL | Explanation of the setting's purpose |
| `updated_by` | UUID / INT | FK (Users.id) | Admin who last changed this config |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Timestamp of the last change |

---

## 8. Audit Logs Table (Admin Security & Auditing)
Logs actions performed by system admins to ensure transparency and accountability.

| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto Increment | Unique log entry ID |
| `user_id` | UUID / INT | FK (Users.id) | The admin user performing the action |
| `action_type` | VARCHAR(100) | NOT NULL | Category of action (e.g., `'USER_SUSPENDED'`, `'SETTINGS_UPDATED'`) |
| `details` | JSON / TEXT | NOT NULL | Structured representation of changes made (e.g., old vs new values) |
| `ip_address` | VARCHAR(45) | NOT NULL | Client IP address of the admin |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Exact time the action took place |
