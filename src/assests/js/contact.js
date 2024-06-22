function submitData() {
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputMessage = document.getElementById("inputMessage").value;

  // Perkondisian
  if (inputName == "") {
      alert("Nama Anda Harus diisi!!!"); // Kondisi 1
  } else if (inputEmail == "") {
      alert("Email Anda Harus diisi!!!"); // kondisi 2
  } else if (inputPhone == "") {
      alert("No Hp Anda Harus diisi!!!"); //kondisi 3
  } else if (inputSubject == "") {
      alert("Subject Harus diisi!!!"); // kondisi 4
  } else if (inputMessage == "") {
      alert("Pesan Anda Harus diisi!!!"); // kondisi 5
  } else {
      alert('Berhasil Menginput Data Anda');
  }
  console.log(
    `Name : ${inputName}\nEmail : ${inputEmail}\nPhone : ${inputPhone}\nSubject : ${inputSubject}\nMessage : ${inputMessage}`
  );

  const myemail = "rifkykisaran2018@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${myemail}?subject=${inputSubject}&body=Hello my name ${inputName}, and my number ${inputPhone} ${inputMessage}`;
  a.click();
}
