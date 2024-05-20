let members = JSON.parse(`[
  {
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

    let newMember = {
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
        deleteButton.addEventListener("click", function () {
            memberList.removeChild(memberLi);
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