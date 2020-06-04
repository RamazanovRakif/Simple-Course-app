//Create Course constructor in ES6
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//SUbmitted the form
let form = document.getElementById('addNewCourse');
form.addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;
    const course = new Course(title, instructor, image)
    console.log(course)

    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complete the form', 'warning');
    }
    else {
        ui.addCourseToList(course);
        //Save To Local Storage
        Storage.addCourse(course)
        ui.clearControls();
        ui.showAlert("Course has been added", 'success');
    }
    e.preventDefault();
})


//Create UI methods
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');

        let html = `
<tr>
<td><img src="img/${course.image}" class="img-thumbnail"></td>
<td>${course.title}</td>
<td>${course.instructor}</td>
<td><a href="#" class="btn btn-danger btn-sm delete" data-id="${course.courseId}">Delete</td>
</tr> 
`;
        list.innerHTML += html;

    }

    clearControls() {
        const image = document.getElementById('title').value = "";
        const title = document.getElementById('instructor').value = "";
        const instructor = document.getElementById('image').value = "";
    }

    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        const alert = `
        <div class='alert alert-${className}'>
        ${message}
        </div>
    `;

        const row = document.querySelector('.row');
        row.insertAdjacentHTML("beforebegin", alert);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500)
    }
}

//Delete Item from UI list
let course_list = document.getElementById('course-list')
course_list.addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteCourse(e.target);
    //Delete From Local Storage
    Storage.deleteCourse(e.target);
    ui.showAlert("Coruse has been deleted", 'danger');
    e.preventDefault();
})


//Storage

class Storage {
    static getCourse() {
        let courses;
        if (localStorage.getItem('courses') === null) {
            courses = [];
        }
        else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourse()
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static addCourse(course) {
        const courses = Storage.getCourse();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses))
    }

    static deleteCourse(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute("data-id");
            const courses = Storage.getCourse();
            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1);
                }
            });
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);