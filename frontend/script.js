const apiUrl = 'http://localhost:5000/api/faculty';
const facultyForm = document.getElementById('facultyForm');
const facultyList = document.getElementById('facultyList');
const generateReportButton = document.getElementById('generateReport');
const reportSection = document.getElementById('reportSection');
const reportContent = document.getElementById('reportContent');
const clearReportButton = document.getElementById('clearReport');

// Load existing faculty profiles from the backend
async function loadFaculty() {
  try {
    const response = await fetch(apiUrl);
    const faculty = await response.json();
    facultyList.innerHTML = '';
    faculty.forEach((facultyMember) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="faculty-info">
          <strong contenteditable="true">${facultyMember.name}</strong> (${facultyMember.designation})
          <p>Department: <span contenteditable="true">${facultyMember.department}</span></p>
          <p>Email: <span contenteditable="true">${facultyMember.email}</span></p>
          <p>Phone: <span contenteditable="true">${facultyMember.phone}</span></p>
        </div>
        <div>
          <!-- Removed the Save button -->
          <button class="delete" onclick="deleteFaculty('${facultyMember._id}')">Delete</button>
        </div>
      `;
      facultyList.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading faculty:', error);
  }
}

// Add a new faculty profile (POST request)
facultyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const designation = document.getElementById('designation').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        department,
        designation,
        email,
        phone,
      }),
    });

    if (response.ok) {
      loadFaculty();
      facultyForm.reset();
    } else {
      alert('Error adding faculty.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Delete faculty (DELETE request)
async function deleteFaculty(id) {
  const confirmation = confirm('Are you sure you want to delete this faculty profile?');
  if (confirmation) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadFaculty();
      } else {
        alert('Error deleting faculty.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Function to prompt for password and generate report if correct
generateReportButton.addEventListener('click', () => {
  // Prompt the user for the password
  const password = prompt('Please enter the password to generate the report:');

  if (password === '1234') {
    const facultyDetails = Array.from(facultyList.children).map((facultyItem) => {
      const name = facultyItem.querySelector('strong').innerText;
      const department = facultyItem.querySelector('p:nth-child(2) span').innerText;
      const email = facultyItem.querySelector('p:nth-child(3) span').innerText;
      const phone = facultyItem.querySelector('p:nth-child(4) span').innerText;
      return `Name: ${name}\nDepartment: ${department}\nEmail: ${email}\nPhone: ${phone}\n\n`;
    }).join('');
    
    reportContent.innerText = facultyDetails;
    reportSection.style.display = 'block';
  } else {
    alert('Incorrect password. Access denied.');
  }
});

// Function to clear the report
clearReportButton.addEventListener('click', () => {
  reportContent.innerText = '';  // Clear the report content
  reportSection.style.display = 'none';  // Hide the report section
});

// Initial load
loadFaculty();
