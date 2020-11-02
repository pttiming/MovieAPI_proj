// Build and populate carousel on page load
$(document).ready(queueCarousel());

// Button click events
$('#my-form-create').submit(addMovie);

function queueCarousel(){
    $("#response").empty();
    $("#response").append(
        `<!--Carousel-->
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          
            <!--Indicators (navigation dots), appended in app.js-->
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            </ol>
        
            <!--Carousel Items-->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="container">
                        <h4>Welcome to Curtain Call</h4>
                    </div>
                </div>
            </div>
        
            <!--Navigation buttons (left, right)-->
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

                // Load new navigation button
                $("#myCarousel .carousel-indicators").append(
                `<li data-target="#myCarousel" data-slide-to="${index+1}"></li>`
                );

                //Load new carousel item
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
                `<table style="margin-left:auto;margin-right:auto;" class="table-striped table-primary table-hover" id ="allMoviesTable" >
                <tr>
                <th></th>
                <th>Title</th>
                <th>Action</th>
                </tr>`
            )

            // Populate table with movies in database
            $.each(data, function(key, value){
                $("#allMoviesTable").append(
                    `<tr class="table-striped table-dark table-hover">
                        <td><image class="tableImage" src="${value.image}" onerror="this.src='./images/default.png'"></td>
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
                    <th>Title</th>
                    <th>Director</th>
                    <th>Genre</th>
                </tr>
                <tr>
                    <td><image class="tableImage" src="${image}" onerror="this.src='./images/default.png'"></td>
                    <td>${data.title}</td>
                    <td>${data.director}</td>
                    <td>${data.genre}</td>
                </tr>
                </table>`
            )
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function addMovie( e ){
    var dict = {
        Title : document.forms.my["title"].value,
        Director: document.forms.my["director"].value,
        Genre: document.forms.my["genre"].value,
        Image: document.forms.my["image"].value
    };

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
    queueCarousel();
}

function updateMovie( e ){
    var dict = {
        MovieId : parseInt(document.forms.myUpdateForm.MovieId.value),
        Title : document.forms.myUpdateForm.Title.value,
        Director: document.forms.myUpdateForm.Director.value,
        Genre: document.forms.myUpdateForm.Genre.value,
        Image: document.forms.myUpdateForm.Image.value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie' ,
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
}

function deleteMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function homeClick(e){
    $("#response").empty()
    queueCarousel();
    e.preventDefault();
}

function newMovie(e){
    $("#response").empty();
    $("#response").append(
        `<div><form name="my">
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="director" placeholder="Director" />
        <input type="text" name="genre" placeholder="Genre" />
        <input type="url" name="image" placeholder="Image URL" />
        
        <button type="submit" onclick="addMovie(event)">Create</button>
    </form>
</div>`
    )
    e.preventDefault();
}

function getMovieToEdit(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);
            var image = data.image;
            if(image == null){image = "./images/default.png"};
            $("#response").empty();
            $("#response").html(
                `<div>
                    <form id="myUpdateForm">
                        <input type="hidden" name="MovieId" value="${id}">
                        <input type="text" name="Title" value="${data.title}" />
                        <input type="text" name="Director" value="${data.director}" />
                        <input type="text" name="Genre" value="${data.genre}" />
                        <input type="text" name="Image" value="${data.image}" />
                        
                        <button type="submit" onclick="updateMovie(event)">Update</button>
                    </form>
                </div>`
            )
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}
function filterMovieBy(attribute){
    $("#response").empty();
    $("#response").append(
        `<div>
            <form name="Search">
                <input type="text" name="search" placeholder="${attribute}" />
                
                <button class="btn-primary" onclick="processSearch('${attribute}', event)" type="submit">search</button>
            </form>
        </div>`
    )
}

function processSearch(attribute, event){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            let searchValue = document.forms.Search.search.value;
            let searchResults = data.filter(function(el){
            if(el[`${attribute}`] == searchValue){
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
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>`
            )
            $.each(searchResults, function(key, value){
                $("#allMoviesTable").append(
                    `<tr class="table-striped table-dark table-hover">
                        <td><image src="${value.image}" onerror="this.src='./images/default.png'" style="width: 50px"></td>
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

$('.dropdown-item').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

$('.nav-link').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});