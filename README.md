# Mail - CS50W Project

This is a web-based email client built as part of the CS50W course by Harvard. The project allows users to send, receive, archive, and reply to emails. This application is built with Django on the backend and uses JavaScript for the front-end functionality, resulting in a single-page app experience.

## Features

- **Inbox**: View all received emails.
- **Sent**: View all emails that you have sent.
- **Archive/Unarchive**: Archive emails from the inbox, or unarchive them from the archive.
- **Compose Email**: Send a new email to one or more recipients.
- **Reply to Emails**: Reply to received emails with the sender's message quoted.
- **Mark as Read**: Emails are automatically marked as read when viewed.

## Technology Stack

- **Backend**: Django (Python)
- **Frontend**: JavaScript (for single-page functionality), HTML, CSS
- **Database**: SQLite (Django default)

## Setup Instructions

To set up this project locally, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/andrewkgithub/your-repo-name.git
   ```

2. Navigate into the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install the required dependencies (you should use a virtual environment):
   ```bash
   pip install -r requirements.txt
   ```

4. Make and apply migrations to set up the database:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```
6. Open your browser and navigate to http://127.0.0.1:8000/ to view the app.

## Usage
Once you're on the site:

1. **Register an account** by clicking on the "Register" button and filling in your details.

2. **Compose an email** by clicking on the "Compose" button, entering the recipient's email, subject, and body, then submitting.

3. **View your inbox** by clicking the "Inbox" button to see all received emails. Click on any email to view its contents.

4. **Sent emails** can be viewed by clicking on the "Sent" button, which shows all the emails you’ve sent.

5. **Archiving and unarchiving emails**: When viewing an email, you have the option to archive it. Once archived, you can access it by clicking on the "Archived" button. Similarly, you can unarchive emails from the archive view.

6. **Reply to an email**: When viewing an email, you can click the "Reply" button to quickly respond to the sender, with the original email quoted below your message.

## Screenshots

![image](https://github.com/user-attachments/assets/96f3ab39-88b7-4f0f-832e-c677f9a38643)
![image](https://github.com/user-attachments/assets/3c6d44e9-ebf9-43cd-972e-16f57cddcec7)
![image](https://github.com/user-attachments/assets/cbcb42e3-c7db-4479-bd09-d702b28ec583)
![image](https://github.com/user-attachments/assets/bd06e484-afaa-4868-a553-3832a20570d4)
![image](https://github.com/user-attachments/assets/1778340a-808b-4e77-bb10-7cfcd2697f2d)






