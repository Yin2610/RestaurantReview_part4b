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
    } else {
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

function previewImg(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var profilePreview = document.getElementById("profilePreview");
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
  .then((data) => {
    sessionStorage.setItem("user_login", "true");
    sessionStorage.setItem("user_info_string", JSON.stringify(data));
    sessionStorage.setItem("login_userId", data[0]._id);
    window.location.href = "../index.html";
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function logoutUser() {
  sessionStorage.setItem("user_login", "false");
  sessionStorage.removeItem("user_info_string");
  sessionStorage.removeItem("register_user_obj_str");
  sessionStorage.removeItem("userId");
  window.location.href = "../index.html";
}

function loginStatus() {
  var loginStatus = sessionStorage.getItem("user_login");
  if (loginStatus == "true") {
    document.getElementById("Register").classList.add("d-none");
    document.getElementById("Login").classList.add("d-none");
    document.getElementById("Logout").classList.add("d-block");
  } else {
    document.getElementById("Register").classList.add("d-block");
    document.getElementById("Login").classList.add("d-block");
    document.getElementById("Profile").classList.add("d-none");
    document.getElementById("Logout").classList.add("d-none");
  }
}

function displayProfile() {
    var user_info_array = JSON.parse(sessionStorage.getItem("user_info_string"));
    console.log(user_info_array);
    htmlProfile =
    '<div class="row"><div class="col-md-5 ml-5 mt-4"><img src="http://127.0.0.1:8080/uploads/' +
    user_info_array[0].userPhoto +
    '" width="150px" height="150px" class="rounded-circle"><br>\
    <h5 class="mt-2">'+ user_info_array[0].userName +'</h5>\
    <div>'+ user_info_array[0].userGender +'</div> \
    <div>'+ user_info_array[0].userContact +'</div> \
    <div>'+ user_info_array[0].userEmail +'</div>';
    if(user_info_array[0].userBio) {
        htmlProfile += '<div>'+ user_info_array[0].userBio +'</div>';
    }
    console.log(htmlProfile);
    document
        .getElementById("userInfo")
        .insertAdjacentHTML("beforeend", htmlProfile);
}
