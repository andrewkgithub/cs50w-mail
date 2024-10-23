document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Submit handler 
  document.querySelector("#compose-form").addEventListener('submit', send_email)

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-detail-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email (id) {
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
      // Print email
      console.log(email);

      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#email-detail-view').style.display = 'block';

      document.querySelector('#email-detail-view').innerHTML = `
        <ul class="list-group">
          <li class="list-group-item"><strong>From:</strong> ${email.sender}</li>
          <li class="list-group-item"><strong>To:</strong> ${email.recipients}</li>
          <li class="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
          <li class="list-group-item"><strong>Timestamp:</strong> ${email.timestamp}</li>
          <li class="list-group-item">${email.body}</li>
        </ul>
      `

      // Change to read
      if (!email.read) {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
      }

      // Archive/Unarchive
      const btn_arch = document.createElement('button')
      btn_arch.innerHTML = email.archived ? "Unarchive" : "Archive";
      btn_arch.className = email.archived ? "btn btn-success mr-2 mt-2" : "btn btn-danger mr-2 mt-2";
      btn_arch.addEventListener('click', function() {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: !email.archived
          })
        })
        .then(() => { load_mailbox('archive')})
      });
      document.querySelector('#email-detail-view').append(btn_arch);

      // Reply logic
      const btn_reply = document.createElement('button')
      btn_reply.innerHTML = "Reply"
      btn_reply.className = "btn btn-primary mt-2";
      btn_reply.addEventListener('click', function() {
        compose_email();

        document.querySelector('#compose-recipients').value = email.sender;
        let subject = email.subject;
        if (subject.split(' ', 1)[0] !="Re:") {
          subject = "Re: " + email.subject;
        }
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `\n\nOn ${email.timestamp} ${email.sender} wrote: ${email.body}`;

      });
      document.querySelector('#email-detail-view').append(btn_reply);

  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-detail-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Get the emails for that mailbox and user 
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Loop through emails and create a div for each 
      emails.forEach(singleEmail => {
        
        console.log(singleEmail);

        // Create div for each email
        const newEmail = document.createElement('div');
        newEmail.style.border = "1px solid black";  // Add border
        newEmail.style.padding = "10px";  // Add padding
        newEmail.style.display = "flex";  // Flexbox for horizontal alignment
        newEmail.style.alignItems = "center";  // Vertically center the items

        // Adjust flex styles so content is not stretched across the div
        newEmail.innerHTML = `
          <span style="flex: 0 0 auto; margin-right: 15px;"><strong>${singleEmail.sender}</strong></span>
          <span style="flex: 1; margin-right: 15px;">${singleEmail.subject}</span>
          <span style="white-space: nowrap;">${singleEmail.timestamp}</span>
        `;

        // Change background color 
        newEmail.className = singleEmail.read ? 'read': 'unread';
        // Add click event to view email 
        newEmail.addEventListener('click', function() {
          view_email(singleEmail.id)
        });
        document.querySelector('#emails-view').append(newEmail);
      })
  });
}

function send_email(event) {
  event.preventDefault();  // Prevent the default form submission behavior

  // Get the values from the compose form
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Send a POST request to the backend API
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  })
  .then(response => response.json())
  .then(result => {
    // Handle the result after sending the email
    console.log(result);

    // If the email was successfully sent, load the sent mailbox
    load_mailbox('sent');
  });
}
