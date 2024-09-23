// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  let img = document.getElementsByClassName('detail-image');
  let restaurant = document.getElementsByClassName('restaurant');
  let name = document.getElementsByClassName('name');
  let rating = document.getElementById('rating-display');
  let comment = document.getElementById('comment-display');
  img[0].src = ramen.image;
  name[0].textContent = ramen.name;
  restaurant[0].textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
  let form = document.getElementById('new-ramen');
  let updatedForm = document.getElementById('edit-ramen');
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let entries = {};
    const formData = new FormData(this);

    for (let [key, value] of formData.entries()) {
      entries[key] = value;
    }
    const jsonData = JSON.stringify(entries)

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: jsonData,
    })
    .then(response => response.json())
    .then(data => console.log('Success', data));
  });
  updatedForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let entries = {};
    const formData = new FormData(this);

    for (let [key, value] of formData.entries()) {
      entries[key] = value;
    }
   const ratingDisplay = document.getElementById('rating-display');
   const commentDisplay = document.getElementById('comment-display'); 

   ratingDisplay.textContent = entries.rating;
   commentDisplay.textContent = entries.comment;
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.forEach(ramen => {
    let img = document.createElement('img');
    img.src = ramen.image;
    document.getElementById('ramen-menu').appendChild(img);
    img.addEventListener("click", function() {
      handleClick(ramen);
    })
    });
  })
  .catch(error => console.error('Error fetching data:', error));
};

const main = () => {
  document.addEventListener('DOMContentLoaded', function() {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
  });
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
