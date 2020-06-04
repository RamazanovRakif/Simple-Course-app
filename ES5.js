let Course = function (title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

let form = document.getElementById("addNewCourse");
form.addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    const course = new Course(title, instructor, image)

    //create UI
    const ui = new UI();
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complete the form', 'warning')
    } else {
        //add course to list
        ui.addCourseToList(course);
        //clear to list
        ui.clearToList();
        ui.showAlert('The course has been added','success')
    }

    e.preventDefault();
})

//UI constructor
function UI() {

}

//Add course List
UI.prototype.addCourseToList = function (course) {
    const list = document.getElementById("course-list");

    let html = `
<tr>
<td><img src="img/${course.image}" class="img-thumbnail"></td>
<td>${course.title}</td>
<td>${course.instructor}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
</tr>
`;
    list.innerHTML += html;
}

//Clear controls
UI.prototype.clearToList = function () {
    const image = document.getElementById('title').value = "";
    const title = document.getElementById('instructor').value = "";
    const instructor = document.getElementById('image').value = "";
}
//UI delete course
UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    };
}

document.getElementById('course-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteCourse(e.target)
   ui.showAlert('Deleted','danger')
});

UI.prototype.showAlert=function(message,className){
    const alert=`
    <div class="alert alert-${className}">
    ${message};
    </div>
    `

    const row=document.querySelector('.row');
    // row.innerHTML+=alert;
    //beforeBegin, afterBegin,beforeEnd,afterEnd
    row.insertAdjacentHTML("beforebegin",alert);
    setTimeout(()=>{
        document.querySelector(".alert").remove();
    },3000)
}