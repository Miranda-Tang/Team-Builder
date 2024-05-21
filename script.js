let members = JSON.parse(`[
{
    "id": ${Date.now()},
    "name": "Miranda T.",
    "description": "Scrooge McDuck's hardcore fan\\nLucky Dime enthusiast",
    "age": 25,
    "image": "https://avatars.githubusercontent.com/u/81618041?v=4"
}
]`);

renderMembers();

function addMember() {
    let memberNameInput = document.getElementById("member_name");
    let memberDescriptionInput = document.getElementById("member_description");
    let memberAgeInput = document.getElementById("member_age");
    let memberImageInput = document.getElementById("member_image");

    let errorMessageDiv = document.getElementById('form_error_message');

    if (!memberNameInput.value || !memberDescriptionInput.value || !memberAgeInput.value || !memberImageInput.value) {
        // Show the error message if any field is empty
        errorMessageDiv.style.visibility = 'visible';
        // Stop the function if form is invalid
        return false;
    } else {
        errorMessageDiv.style.visibility = 'hidden'; // Hide the error message; the error message div will still take up space
    }

    let newMember = {
        id: Date.now(),
        name: memberNameInput.value,
        description: memberDescriptionInput.value,
        age: memberAgeInput.value,
        image: memberImageInput.value
    };

    members.push(newMember);

    memberNameInput.value = "";
    memberDescriptionInput.value = "";
    memberAgeInput.value = "";
    memberImageInput.value = "";

    renderMembers();
}

function clearForm() {
    document.getElementById("member_name").value = "";
    document.getElementById("member_description").value = "";
    document.getElementById("member_age").value = "";
    document.getElementById("member_image").value = "";

    let errorMessageDiv = document.getElementById('form_error_message');
    errorMessageDiv.style.visibility = 'hidden';
}

function renderMembers() {
    let memberList = document.getElementById("member_list");

    memberList.innerHTML = ""; // Clear the current list

    for (let i = 0; i < members.length; i++) {
        let memberLi = document.createElement("li");

        memberLi.innerHTML = `
            <div class="member-image">
                <img src="${members[i].image}" alt="${members[i].name}">
            </div>
            <div class="member-details">
                <h2>${members[i].name}</h2>
                <p class="description"></p>
                <p>Age: ${members[i].age}</p>
            </div>
            <button class="delete-button">X</button>
        `;

        memberList.appendChild(memberLi);

        // After memberLi is added to the DOM, work with .description
        let descriptionElement = memberLi.querySelector(".description");
        descriptionElement.innerHTML = members[i].description.replace(
            /\n/g,
            "<br>"
        );

        let deleteButton = memberLi.querySelector(".delete-button");
        deleteButton.dataset.id = members[i].id;
        deleteButton.addEventListener("click", function () {
            let id = parseInt(this.dataset.id);
            members = members.filter(member => member.id !== id);
            memberList.removeChild(memberLi);
            console.log(members);
        });
    }
}

function deleteAllMembers() {
    members = [];

    let memberList = document.getElementById("member_list");
    memberList.innerHTML = "";
}

document.getElementById("add_member").addEventListener("click", addMember);
document.getElementById("clear_form").addEventListener("click", clearForm);
document.getElementById("delete_all_members").addEventListener("click", deleteAllMembers);