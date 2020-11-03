// Build and populate carousel on page load
$(document).ready(queueCarousel());

function queueCarousel() {

    // Clear response div
    $("#response").empty();

    // Build carousel skeleton
    $("#response").append(
        `<div id="myCarousel" class="carousel slide" data-ride="carousel">
          
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            </ol>
        
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="container">
                        <h4>Welcome to Curtain Call</h4>
                    </div>
                </div>
            </div>
        
            <a href="#myCarousel" class="carousel-control-prev" role="buton" data-slide="prev">
                <span class="sr-only">Previous</span>
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a href="#myCarousel" class="carousel-control-next" role="buton" data-slide="next">
                <span class="sr-only">Previous</span>
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
        </div>`
    );
    populateCarousel();
}

function populateCarousel() {
    // Get All Movies API call
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $.each(data, function(index, value){

                // Load new navigation buttons
                $("#myCarousel .carousel-indicators").append(
                `<li data-target="#myCarousel" data-slide-to="${index+1}"></li>`
                );

                // Load new carousel items
                $(".carousel-inner").append(
                    `<div class="carousel-item">
                        <div class="container">
                        <img src="${value.image}" height="200" onerror="this.src='./images/default.png'" onclick="getSingleMovie(${value.movieId})">
                            <h4 onclick="getSingleMovie(${value.movieId})">${value.title}</h4>
                        </div>
                    </div>`
                );
            })
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function viewAllMovies(e) {
    // Get All Movies API call
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);

            // Clear response div
            $("#response").empty();
            
            // Load table skeleton
            $("#response").html(
                `<table class="table-responsive-lg" id ="allMoviesTable">
                    <tr>`
            );
            $.each(data, function(key, value){
                $("#allMoviesTable").append(
                    `<td onclick="getSingleMovie(${value.movieId})" title="Click to See Movie Details">${value.title}</td>`
                );
            });
            $("#allMoviesTable").append(
                `</tr>
                <tr>`
            );
            $.each(data, function(key, value){
                $("#allMoviesTable").append(
                    `<td><image class="tableImage2" src="${value.image}" title="Click to See Movie Details" onerror="this.src='./images/default.png'" width="100px" onclick="getSingleMovie(${value.movieId})"></td>`
                );
            });
            $("#allMoviesTable").append(
                `</tr></table>`
            );
            
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    e.preventDefault();
    
}

function getSingleMovie(id){
    $.ajax({
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            var image = data.image;
            if(image == null){
                image = "./images/default.png";
            };

            // Clear response div
            $("#response").empty();

            // Load table sketelon and data
            $("#response").html(
                `<table class="tableResponse" class="table-striped table-dark table-hover" id ="singleMovieTable" >
                    <tr>
                        <th></th>
                        <td><div><img src="${image}" onerror="this.src='./images/default.png'" width="150px"></td>
                    <tr>
                        <th>Title:  </th>
                        <td>${data.title}</td>
                    </tr>
                    <tr>
                        <th>Director:  </th>
                        <td>${data.director}</td>
                    </tr>
                    <tr> 
                        <th>Genre:  </th>
                        <td>${data.genre}</td>
                    </tr>  
                    <tr> 
                        <th></th>
                        <td><button class="btn-primary" onclick="getMovieToEdit(${data.movieId})">Edit this Movie</button></td>
                    </tr>  
                </table></div>`
            )
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function newMovie(e){
    $("#response").empty();
    $("#response").append(
        `<div class="movie-form"><form name="my">
        <div class ="row">
            <h4>Add a Movie to the Database</h4>
            <div class="col-md-6">
            <div class="form-group">
                <input type="text" name="title" placeholder="Title" />
                </div>
                <div class="form-group">
                <input type="text" name="director" placeholder="Director" />
                </div>
                <div class="form-group">
                <input type="text" name="genre" placeholder="Genre" />
                </div>
                <div class="form-group">
                <input type="url" id="movieurl" name="image" placeholder="Image URL" onchange="addImage(event)"/>
                </div>
                <div class="form-group">                
                <button type="submit" class="btn-primary" onclick="addMovie(event)">Add Movie</button>
                <button type="submit" class="btn-primary" onclick="homeClick(event)">Cancel</button>
                </div>
            </div>
                <div class="col-md-6">
                <div class="form-group">
                <img  id="movieimg" src="./images/default.png"  width="125px" onerror="this.src='./images/default.png'">
                </div>
            </div>
            </form>
        </div>
        </div>`
    )
    e.preventDefault();
}

function addMovie( e ){
    var dict = {
        Title : document.forms.my["title"].value,
        Director: document.forms.my["director"].value,
        Genre: document.forms.my["genre"].value,
        Image: document.forms.my["image"].value
    };

    // Add movie API call
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    e.preventDefault();

    // Reload/populate carousel
    queueCarousel();
}

function getMovieToEdit(id){
    $.ajax({
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);
            var image = data.image;
            if(image == null){
                image = "./images/default.png"
            if(data.image == null){
                data.image = "Image URL"
            }
            };
            $("#response").empty();
            $("#response").html(
                `<div class="movie-form"><form name="myUpdateForm">
        <div class ="row">
            <h4>Update Movie Details</h4>
            <div class="col-md-6">
            <div class="form-group">
                <input type="hidden" name="MovieId" value="${id}">
                <label for="title">Movie Title:</label><br>
                <input type="text" name="title" value="${data.title}" />
                </div>
                <div class="form-group">
                <label for="director">Director:</label><br>
                <input type="text" name="director" value="${data.director}" />
                </div>
                <div class="form-group">
                <label for="genre">Genre:</label><br>
                <input type="text" name="genre" value="${data.genre}" />
                </div>
                <div class="form-group">
                <label for="image">Movie Image URL:</label><br>
                <input type="url" id="editmovieurl" name="image" value="${data.image}" onchange="updateImage(event)"/>
                </div>
                <div class="form-group">                
                <button type="submit" class="btn-primary" onclick="updateMovie(event)">Update Movie</button>
                <button type="submit" class="btn-primary" onclick="homeClick(event)">Cancel</button>
                </div>
            </div>
                <div class="col-md-6">
                <div class="form-group">
                <img  id="editmovieimg" src="${data.image}"  width="125px" onerror="this.src='./images/default.png'">
                </div>
            </div>
            </form>
        </div>
        </div>`
            )
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function updateMovie( e ){
    var dict = {
        MovieId : parseInt(document.forms.myUpdateForm.MovieId.value),
        Title : document.forms.myUpdateForm.title.value,
        Director: document.forms.myUpdateForm.director.value,
        Genre: document.forms.myUpdateForm.genre.value,
        Image: document.forms.myUpdateForm.image.value
    };
    
    // Put movie API call
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    e.preventDefault();

    // Reload/populate carousel
    queueCarousel();
}

function homeClick(e){
    $("#response").empty()
    queueCarousel();
    e.preventDefault();
}

function filterMovieBy(attribute){
    $("#response").empty();
    $("#response").append(
        `<div>
            <form name="Search">
                <input type="text" name="search" placeholder="Search within ${attribute}" />
                
                <button class="btn-primary" onclick="processSearch('${attribute}', event)" type="submit">search</button>
            </form>
        </div>`
    )
}

function processSearch(attribute, event){
    // Get All Movies API call
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            let searchValue = document.forms.Search.search.value.toLowerCase();
            let searchResults = data.filter(function(el){
            if(el[`${attribute.toLowerCase()}`].toLowerCase().includes(searchValue)){
                return true;  
            }
            else{
                return false;
            }
            })

            // Clear response div
            $("#response").empty();

            // Load table sketelon
            $("#response").html(
                `<table class="tableResponse" class="table-striped table-primary table-hover" id ="allMoviesTable" >
                    <h5>Results for '${searchValue}' within ${attribute}:</h5>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>`
            )
            $.each(searchResults, function(key, value){
                $("#allMoviesTable").append(
                    `<tr class="table-striped table-dark table-hover">
                        <td><image src="${value.image}" class="tableImage" onerror="this.src='./images/default.png'"></td>
                        <td>${value.title}</td>
                        <td>
                            <button class="details" onclick="getSingleMovie(${value.movieId})">Details</button>
                            <button class="edit" onclick="getMovieToEdit(${value.movieId})">Edit</button>
                        </td>
                    </tr>
                </table>`
                );
            });
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    event.preventDefault();
}

// Navbar items

$('.dropdown-item').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

$('.nav-link').not("#navdrop").on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

//Displays Image in Add Image
function addImage(){
    let newImage = document.forms.my.image.value;
        $("#movieimg").attr("src", newImage);
}

function updateImage(){
    let newImage = document.forms.myUpdateForm.image.value;
        $("#editmovieimg").attr("src", newImage);
}

function bigImg(x) {
    x.style.width = "200px";
  }

  function normalImg(x) {
    x.style.width = "100px";
  }