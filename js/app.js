// Variables
const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listcourse = document.querySelector('#list-cart tbody');
const emptyCartBtn = document.getElementById('empty-cart');


// Listeners
cargarEventListeners();
function cargarEventListeners() {
 
  courses.addEventListener('click', compareCourse);
  
  cart.addEventListener('click', removeCourse);
  
  emptyCartBtn.addEventListener('click', emptyCart);

  document.addEventListener('DOMContentLoaded', readLocalStorage);
}


function compareCourse(e) {
  e.preventDefault();

  if(e.target.classList.contains('goto-cart')) {
    const course = e.target.parentElement.parentElement;
  
    makeCourseObj(course);
  }
}

function makeCourseObj(course) {
  const infocourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.discount').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  insetToCart(infocourse);
}


function insetToCart(course) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>
  <a href="#" class="delete-course" data-id="${course.id}">X</a>
  </td>
  `;
  listcourse.appendChild(row);
  saveCourseLocalStorage(course);
}


function removeCourse(e) {
  e.preventDefault();
  let course,
      courseId;
  if(e.target.classList.contains('delete-course') ) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }
  removeCourseLocalStorage(courseId);
}


function emptyCart() {
  
  while(listcourse.firstChild) {
    listcourse.removeChild(listcourse.firstChild);
  }

  
  emptyLocalStorage();
  return false;
}


function saveCourseLocalStorage(course) {
  let courses;
  
  courses = obtaincourseLocalStorage();
  
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses) );
}


function obtaincourseLocalStorage() {
  let coursesLS;
  
  if(localStorage.getItem('courses') === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse( localStorage.getItem('courses') );
  }
  return coursesLS;
}


function readLocalStorage() {
  let coursesLS;
  coursesLS = obtaincourseLocalStorage();
  coursesLS.forEach(function(course){
 
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>
  <a href="#" class="delete-course" data-id="${course.id}">X</a>
  </td>
  `;
  listcourse.appendChild(row);
  });
}


function removeCourseLocalStorage(course) {
  let coursesLS;

  coursesLS = obtaincourseLocalStorage();
 
  coursesLS.forEach(function(coursesLS, index) {
    if(coursesLS.id === course) {
      coursesLS.splice(index, 1);
    }
  });
 
  localStorage.setItem('courses', JSON.stringify(coursesLS) );
}


function emptyLocalStorage() {
  localStorage.clear();
}
