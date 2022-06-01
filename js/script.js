// Burger bar
let navigation = document.getElementById('navbarlinks');
let toggleButton = document.getElementById('toggleBurger');
let headerRelative = document.querySelector('.navbar-relative')
toggleButton.addEventListener('click', function() {
    navigation.classList.toggle('activeNavigation');
    toggleButton.classList.toggle('activeBurger');

    headerRelative.classList.toggle('activeHeader');

})
// Posts


let mainPostWraper = document.getElementById('post-block');
let content = document.getElementById('content');
let postOverlay = document.getElementById('overlay');
let closePostOverlay = document.getElementById('closePost-icon');

function ajax(url, callBack){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);

        callBack(data);
    })
    request.send();
};

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printData(data)
});

function printData (data) {
    data.slice(0, 6).forEach(element => {
        createPost(element);             
    });
}

function createPost(item){

    let postWraper = document.createElement('div');
    postWraper.setAttribute('data-id', item.id);
    postWraper.classList.add('min-post');
    
    let postId = document.createElement('h2');
    postId.innerHTML =  item.id;
    postId.classList.add('post-id');

    let postTitle = document.createElement('h3');
    postTitle.innerHTML =  item.title;
    postTitle.classList.add('post-title');

    let viewPost = document.createElement('button');
    viewPost.classList.add('post-button');
    viewPost.textContent = 'View Post';
    viewPost.setAttribute('data-id', item.id);

    postWraper.addEventListener('click', function(event){
        content.innerHTML = '';
        let id = event.target.getAttribute('data-id');
        postOverlayOpen(id);
    });


    postWraper.appendChild(postId);
    postWraper.appendChild(postTitle);
    postWraper.appendChild(viewPost);
    mainPostWraper.appendChild(postWraper);
}

function postOverlayOpen(id){
    postOverlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data){
        setPostOverlay(data);
    });
}
function setPostOverlay(item){
    let titlePost = document.createElement('h2');
    titlePost.innerText = item.title;
    titlePost.classList.add('post-title');

    let postDescr = document.createElement('p');
    postDescr.innerText = item.body;
    postDescr.classList.add('post-descr');

    postOverlay.appendChild(content);    
    content.appendChild(titlePost);
    content.appendChild(postDescr);


    closePostOverlay.addEventListener('click', function(){
        postOverlay.classList.remove('active');
        content.innerHTML = '';
    });
}

// slider

let data = [
    {
        id: 1,
        imageUrl: 'images/Sliderimg1.jpg',
        title: 'Rooftop Terrace',
        url: 'https://google.com'
    },
    {
        id: 2,
        imageUrl: 'images/Sliderimg2.jpg',
        title: 'Living Room',
        url: 'https://facebook.ge'
    },
    {
        id: 3,
        imageUrl: 'images/Sliderimg3.jpg',
        title: 'Bedroom',
        url: 'https://youtube.com'
    },
    {
        id: 4,
        imageUrl: 'images/Sliderimg4.jpg',
        title: 'Kitchen',
        url: 'https://gmail.com'
    },
    {
        id: 5,
        imageUrl: 'images/Sliderimg5.jpg',
        title: 'Exterior',
        url: 'https://google.com'
    }
]

let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let dotsList = document.getElementsByClassName('dot');

let sliderIndex = 0;

function createAtag(item) {
    let aTag = document.createElement('a');
    aTag.setAttribute('href', item.url);
    aTag.classList.add('slide');

    return aTag;
}

function createBackgroundImg(item) {
    let backgrImgDiv = document.createElement('div');
    backgrImgDiv.classList.add('background-img');
    backgrImgDiv.style.backgroundImage =  "url(" + item.imageUrl + ")";
    
    return backgrImgDiv;

}

function createH2Tag (item){
    let H2tag = document.createElement('h2');
    H2tag.append(item.title);
    H2tag.classList.add('slider-title');

    return H2tag;
}

function createDots(item) {
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach( (element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id - 1);

        dot.onclick = function(event) {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlide();
        }
        dots.appendChild(dot);
    });
    return dots;
}

function setSlide() {
    sliderContent.innerHTML = '';
    let tagA = createAtag(data[sliderIndex]);
    let backgrImg = createBackgroundImg(data[sliderIndex]);
    let tagH2 = createH2Tag(data[sliderIndex]);
    let sliderDots = createDots();
    
    tagA.appendChild(backgrImg);
    tagA.appendChild(tagH2);
    sliderContent.appendChild(tagA);
    sliderContent.appendChild(sliderDots);

    currentDotActive();
}

function currentDotActive() {
    dotsList[sliderIndex].classList.add('active');
}

function leftArrowClick() {
    if (sliderIndex <= 0) {
        sliderIndex = data.length - 1;
        setSlide();
        return;
    }
    sliderIndex--;
    setSlide();
}
function rightArrowClick() {
    if (sliderIndex >= data.length-1) {
        sliderIndex = 0;
        setSlide();
        return;
    }
    sliderIndex++;
    setSlide();
}

arrowLeft.addEventListener('click', leftArrowClick);
arrowRight.addEventListener('click', rightArrowClick);

setInterval( () => {
    rightArrowClick();
}, 3000);

setSlide();
// service Page

function openForm() {
    document.getElementById("service-overlay").style.display = "block";
}
function closeForm() {
    document.getElementById("service-overlay").style.display = "none";
}


function validation (event) {

    event.preventDefault();
    
    let errors = {};
    let form = event.target;

// title

    let title = document.getElementById('title').value;
    let spanTitle = document.getElementById('error_title');

    if (title.length > 25) {
        errors.title = 'Title can not be more than 25 symbols';
        spanTitle.classList.add('invalid');
    }
    if(title == ''){
        errors.title = 'Title can not be empty';
        spanTitle.classList.add('invalid');
    }
// Description

   let description = document.getElementById('Description').value;
   let spanDescription = document.getElementById('error_description');

   if ( description.length > 100) {
       errors. description = 'Description can not be more than 100 symbols';
       spanDescription.classList.add('invalid');
   }
   if(description == ''){
       errors. description = 'Description can not be empty';
       spanDescription.classList.add('invalid');
   }


   // radio
   let age = false;
   let spanAge = document.getElementById('error_age');

   form.querySelectorAll('[name = "age"]').forEach(element => {
       if (element.checked) {
           age  = true;
       }
   });
   

   if (!age) {
       errors.age = 'Please select your age';
       spanAge.classList.add('invalid');
   }

    //    email
    let email = document.getElementById('email').value;
    let spanEmail = document.getElementById('error_email');
    let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(email == ''){
        errors.email = 'Email can not be empty';
        spanEmail.classList.add('invalid');
    }else if (!email.match(emailStructure)) {
        errors.email = "Your email is invalid";
        spanEmail.classList.add('invalid');   
    }

    // checkbox
    let agree = document.getElementById('checkagree').checked;
    let spanAgree = document.getElementById('error_agree');

    if (!agree) {
        errors.agree = 'You must agree our terms and conditions';
        spanAgree.classList.add('invalid');
    }
    form.querySelectorAll('.error-text').forEach(item => {
        item.innerHTML = '';
    });


    for (let item in errors) {
        let errorSpan = document.getElementById('error_' + item);

        if (errorSpan) {
            errorSpan.textContent = errors[item];
        }
    }


    if (Object.keys(errors).length == 0) {
        
        setServiceDiv();

    }
}



// service

function setServiceDiv(event) {
    innerHTML = " ";
    let serviceWraperDiv = document.getElementById('service-Wraper-div');

    let serviceContainer = document.createElement('div');
    serviceContainer.classList.add('service-container');

    let serviceImg = document.createElement('div');
    serviceImg.classList.add('service-img');
    let myfile = document.getElementById('myfile');
    serviceImg.style.backgroundImage =  "url(" + `images/${myfile.files[0].name}` + ")";


    let serviceText = document.createElement('div');
    serviceText.classList.add('service-text');

    let serviceTitle = document.createElement('h2');
    serviceTitle.innerHTML = document.getElementById('title').value;
    serviceTitle.classList.add('service-text-title');

    let serviceDescription = document.createElement('p');
    serviceDescription.innerHTML = document.getElementById('Description').value;
    serviceDescription.classList.add('service-description');
    
    
    let serviceEmail = document.createElement('p');
    serviceEmail.innerHTML = 'Email: ' + document.getElementById('email').value;

    let Ageservice = 'Age: ';

    document.querySelectorAll('[name = "age"]').forEach(element => {
        if (element.checked) {
            Ageservice += element.value;
        }
    });

    let serviceAge = document.createElement('p');
    serviceAge.innerHTML = Ageservice;
    serviceAge.classList.add('service-age');

    serviceWraperDiv.appendChild(serviceContainer);
    serviceContainer.appendChild(serviceText);
    serviceContainer.appendChild(serviceImg);
    serviceText.appendChild(serviceTitle);
    serviceText.appendChild(serviceDescription);
    serviceText.appendChild(serviceAge);
    serviceText.appendChild(serviceEmail);

    // console.log(serviceContainer);
    // closeForm();

}

