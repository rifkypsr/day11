var addProject = [];

function handleProject(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let start = document.getElementById("start-d").value;
  let end = document.getElementById("end-d").value;
  let message = document.getElementById("content").value;
  let check = document.querySelectorAll("input:checked");
  let imgUpl = document.getElementById("upload").files[0];

  if (name === "" || start === "" || end === "" || message === "" || !imgUpl) {
    return alert("Please complete the empty fields");
  } else if (start > end) {
    return alert("The end date cannot be less than the start date");
  } else if (check.length <= 0) {
    return alert("Please checked one of the box");
  } else {
    let urlImage = URL.createObjectURL(imgUpl);
    let listTech = [];
    check.forEach((item) => {
      listTech.push(item.value);
    });

    let startDatePart = start.split("/");
    let endDatePart = end.split("/");

    let formatStartDate = `${startDatePart[2]} - ${startDatePart[1]} - ${startDatePart[0]}`;
    let formatEndDate = `${endDatePart[2]} - ${endDatePart[1]} - ${endDatePart[0]}`;

    let newStartDate = new Date(formatStartDate);
    let newEndDate = new Date(formatEndDate);

    let timeDifference = newEndDate - newStartDate;
    let getDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let getMonths = Math.floor(getDays / 30.44);
    let getYears = Math.floor(getMonths / 12);

    let duration;
    if (getYears > 0) {
      duration = `${getYears} Tahun`;
    } else if (getMonths > 0) {
      duration = `${getMonths} Bulan`;
    } else {
      duration = `${getDays} Hari`;
    }

    addProject.push({
      title: name,
      start,
      end,
      message,
      imgUpl: urlImage,
      duration,
      listTech,
    });
  }

  localStorage.setItem("myProject", JSON.stringify(addProject));

  const temp = document.getElementById("card");
  addProject.map((item, key) => {
    temp.innerHTML += `<div class='card-content'>    
    <img src='${item.imgUpl}' alt='img'/>
                  <a href="viewproject.html?id=${
                    key + 1
                  }" style="text-decoration : none; margin : 0; color: black;" target="_blank"><p class='title-content'>${
      item.title
    }</p></a>  
                 <small>durasi : ${item.duration}</small>
                 <p class='txt-content'>${item.message.substr(0, 80)}</p>
                 <i class="fa-brands fa-google-play"></i>
                 <i class="fa-brands fa-android"></i>
                 <i class="fa-brands fa-java"></i>
                 <div class='action'>
                 <button>edit</button>
                 <button style='margin-left : 3px'>delete</button>
                 </div>
     </div>`; 
  });
}
