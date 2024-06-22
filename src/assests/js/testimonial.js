

const testimonial = new Promise((resolve, reject) => {
const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/7fe3130b33e5f25a579e", true);
  xhr.onload = function () {
  if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
  } else {
    reject("Erorr Loaded Data");
     
    }
  };
  xhr.onerror = function () {
   reject("404 Not Found");
   
  };

 
xhr.send();
});

async function showTestimonial() {
try {
  const response = await testimonial;
   
  let testimonialHtml = ``;

  response.forEach((item) => {
    testimonialHtml += `
    <div class="testimonial">
      <img src="${item.image}" alt="testimonial" class="profile-testimonial">
                 <p class="quote">${item.content}</p>
                 <p class="author">- ${item.author}</p>
                 <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHtml;

  } catch (error) {
    console.log(error);
  }
}
                                      // BAGIAN CALLBACK ADA DIBAWAH
showTestimonial();

async function filterTestimonials(rating) {
  try {
    const response = await testimonial;
       let testimonialHtml = ``;

            const dataFilter = response.filter((data) => data.rating === rating);
                if (dataFilter.length === 0) {
              testimonialHtml = `<h1> Data not found!</h1>`;
           } else {
          dataFilter.forEach((item) => {
        testimonialHtml += `<div class="testimonial">
        <img src="${item.image}" alt="testimonial" class="profile-testimonial">
            <p class="quote">${item.content}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
      });
    }

    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}
