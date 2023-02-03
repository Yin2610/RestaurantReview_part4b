function registerUser() {
  var user = new Object();
  var username = document.getElementById("registerUsername").value;
  var password = document.getElementById("registerPassword").value;
  var confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  if (password == confirmPassword) {
    let pattern = /[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,20}/;
    if (pattern.test(password)) {
      user.username = username;
      user.password = password;
      var register_user_obj_str = JSON.stringify(user);
      sessionStorage.setItem("register_user_obj_str", register_user_obj_str);
      window.location.href = "personalDetails.html";
    } 
    else {
      alert("Your password does not meet the requirements. Please try again.");
    }
  } else {
    alert("Your password and confirm password do not match. Please try again.");
  }
}

function passNameAndPw() {
  var register_user_obj = JSON.parse(
    sessionStorage.getItem("register_user_obj_str")
  );
  console.log(register_user_obj);
  var userName = register_user_obj.username;
  var password = register_user_obj.password;
  document.getElementById("userNameDetail").value = userName;
  document.getElementById("passwordDetail").value = password;
}

function previewImg(element, event) {
  var reader = new FileReader();
  reader.onload = function () {
    if(element.getAttribute("id") == "profilePreviewBtn") {
      var profilePreview = document.getElementById("profilePreview");
    }
    else {
      var profilePreview = document.getElementById("editProfilePreview");
    }
    profilePreview.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function loginUser() {
  var user = {
    userName: document.getElementById("loginUsername").value,
    password: document.getElementById("loginPassword").value,
  };
  fetch("http://127.0.0.1:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      alert("Username or password is not correct.");
      throw "Login failed";
    }
  })
  .then((token) => {
    if(token.result != false) {
      alert("User login successful.");
      localStorage.setItem("login_userId", token.userId);
      localStorage.setItem("token", token.result);
      window.location.href = "../index.html";
    }
    else {
      alert("User login fail.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_info_string");
  localStorage.removeItem("login_userId");
  window.location.href = "../index.html";
}

function loginStatus() {
  var loginStatus = localStorage.getItem("token");
  if (loginStatus != null) {
    document.getElementById("Register").classList.add("d-none");
    document.getElementById("Login").classList.add("d-none");
    document.getElementById("Profile").classList.add("d-block");
    document.getElementById("Logout").classList.add("d-block");
  } else {
    document.getElementById("Register").classList.add("d-block");
    document.getElementById("Login").classList.add("d-block");
    document.getElementById("Profile").classList.add("d-none");
    document.getElementById("Logout").classList.add("d-none");
  }
}

function fetchUserDetails() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:8080/users/" + localStorage.getItem("login_userId"), false);
  //This function will be called when data returns from the web api
  request.onload = function () {
    var user_array = JSON.parse(request.responseText);
    var user_array_string = JSON.stringify(user_array);
    localStorage.setItem("user_info_string", user_array_string);
    console.log(localStorage.getItem("user_info_string"));
    displayProfile();
  };
  request.send();
}

function displayProfile() {
    var user_info_array = JSON.parse(localStorage.getItem("user_info_string"));
    console.log(user_info_array);
    htmlProfile =
    '<div class="row"><div class="col-md-5 ml-5 mt-4"><img src="http://127.0.0.1:8080/uploads/' +
    user_info_array.userPhoto +
    '" width="150px" height="150px" class="rounded-circle"><br>\
    <h5 class="mt-2">'+ user_info_array.userName +'</h5>\
    <div>'+ user_info_array.userGender +'</div> \
    <div>'+ user_info_array.userContact +'</div> \
    <div>'+ user_info_array.userEmail +'</div>';
    if(user_info_array.userBio) {
        htmlProfile += '<div>'+ user_info_array.userBio +'</div>';
    }
    console.log(htmlProfile);
    document
        .getElementById("userInfo")
        .insertAdjacentHTML("beforeend", htmlProfile);
}

function displayEditPersonalDetails() {
  var user_info_array = JSON.parse(localStorage.getItem("user_info_string"));
  document.getElementById("editProfilePreview").src = "http://127.0.0.1:8080/uploads/" + user_info_array.userPhoto;
  document.getElementById("editUserNameDetail").value = user_info_array.userName;
  document.getElementById("editEmailDetail").value = user_info_array.userEmail;
  document.getElementById("editContactDetail").value = user_info_array.userContact;
  if(user_info_array.userGender == "Male") {
    document.getElementById("editRdoMale").checked = true;
  }
  else {
    document.getElementById("editRdoFemale").checked = true;
  }
  document.getElementById("editUserBio").value = user_info_array.userBio;
}