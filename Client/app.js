// Get all movies on load
$(document).ready(queueCarousel());

// Button click events

//$('#my-form-getAll').submit(getAllMovies);
//$('#my-form-getSingle').submit(getSingleMovie);
//$('#my-form-create1').submit(addMovie());
$('#my-form-create').submit(addMovie);
//$('#my-form-update').submit(updateMovie);
//$('#my-form-delete').submit(deleteMovie);

// API Calls

function populateCarousel() {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $.each(data, function(index, value){
                if ($({index}) == 0){
                    $("#myCarousel .carousel-indicators").append(
                        `<li data-target="#myCarousel" data-slide-to="${index}" class="active"></li>`
                    );
                    $(".carousel-inner").append(
                        `<div class="carousel-item active">
                            <div class="container">
                                <img src="${value.image}" height="200">
                                <h4>${value.title}</h4>
                                <a onclick="getSingleMovie(${value.movieId})" class="btn btn-lg btn-primary">
                                    Edit something about movie
                                </a>
                            </div>
                        </div>`
                    );
                } else {
                    $("#myCarousel .carousel-indicators").append(
                    `<li data-target="#myCarousel" data-slide-to="${index+1}"></li>`
                    );
                    $(".carousel-inner").append(
                        `<div class="carousel-item">
                            <div class="container">
                            <img src="${value.image}" height="200">
                                <h4>${value.title}</h4>
                                <a onclick="getSingleMovie(${value.movieId})" class="btn btn-lg btn-primary">
                                    See Movie Details
                                </a>
                            </div>
                        </div>`
                    );
                }
                /*
                $("#allMoviesTable").append(
                    
                    `<tr>
                        <td><image src="${value.image}" style="width: 50px"></td>
                        <td>${value.title}</td>
                        <td>
                            <button class="details" onclick="getSingleMovie(${value.movieId})">Details</button>
                            <button class="edit" onclick="showInConsole(${value.movieId})">Edit</button>
                            <button class="delete" onclick="showInConsole(${value.movieId})">Delete</button>
                        </td>
                    </tr>`
                );
                */
            });
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function viewAllMovies() {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $("#response").empty();
            $("#response").html(
                `<table style="margin-left:auto;margin-right:auto;" class="table-striped table-primary table-hover" id ="allMoviesTable" >
        <tr>
            <th></th>
            <th>Title</th>
            <th>Action</th>
        </tr>`
            )
            $.each(data, function(key, value){
                $("#allMoviesTable").append(
                    `<tr class="table-striped table-dark table-hover">
                        <td><image src="${value.image}" onerror="this.src='./images/default.png'" style="width: 50px"></td>
                        <td>${value.title}</td>
                        <td>
                            <button class="details" onclick="getSingleMovie(${value.movieId})">Details</button>
                            <button class="edit" onclick="getMovieToEdit(${value.movieId})">Edit</button>
                            <button class="delete" onclick="deleteMovie(${value.movieId})">Delete</button>
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
}

function showInConsole(movieId){
    console.log("Delete movie: " + movieId);
}

// GET - Get all movies

function getAllMovies( e ){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            //console.log(data)
            //$('#response pre').html( JSON.stringify(data) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    e.preventDefault();
}


// GET - Get single movie
function getSingleMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);
            var image = data.image;
            if(image == null){image = "./images/default.png"};
            //$('#response pre').html( JSON.stringify(data) );
            $("#response").empty();
            $("#response").html(
                `<table style="margin-left:auto;margin-right:auto;" class="table-striped table-dark table-hover" id ="singleMovieTable" >
            <tr>
                <th></th>
                <th>Title</th>
                <th>Director</th>
                <th>Genre</th>
            </tr>
            <tr>
                <td><image src="${image}" onerror="this.src='./images/default.png'" style="width: 50px"></td>
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

//Post - Add movie
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
            console.log("Movie added");
            //$('#response pre').html( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

// PUT - Update movie
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
            console.log("Movie Updated");
            //$('#response pre').html( "Movie Updated" );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

// DELETE
function deleteMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log("Movie deleted");
            //$('#response pre').html( textStatus );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function homeClick(){
    $("#response").empty()
    queueCarousel();
}

function newMovie(){
    $("#response").empty();
    $("#response").append(
        `<div><form name="my">
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="director" placeholder="Director" />
        <input type="text" name="genre" placeholder="Genre" />
        <input type="url" name="image" placeholder="Image URL" />
        
        <button type="submit" onclick="addMovie()">Create</button>
    </form>
</div>`
    )
}

function queueCarousel(){
    $("#response").empty();
    $("#response").append(
        `<!--Carousel-->
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          
          <!--Indicators (navigation dots), appended in app.js-->
          <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          </ol>
      
          <!--Carousel Items, appended in app.js-->
          <div class="carousel-inner">
              <div class="carousel-item active">
                  <div class="container">
                      <h4>Welcome to Curtain Call</h4>
                  </div>
              </div>
          </div>
      
          <!--Navigation buttons (left, right), hard coded-->
          <a href="#myCarousel" class="carousel-control-prev" role="buton" data-slide="prev">
              <span class="sr-only">Previous</span>
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a href="#myCarousel" class="carousel-control-next" role="buton" data-slide="next">
              <span class="sr-only">Previous</span>
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>`
    )
    populateCarousel();
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
            //$('#response pre').html( JSON.stringify(data) );
            $("#response").empty();
            $("#response").html(
                `<div><form id="myUpdateForm">
                        <input type="hidden" name="MovieId" value="${id}">
                        <input type="text" name="Title" value="${data.title}" />
                        <input type="text" name="Director" value="${data.director}" />
                        <input type="text" name="Genre" value="${data.genre}" />
                        <input type="url" name="Image" value="${data.image}" />
                        
                        <button type="submit" onclick="updateMovie()">Update</button>
                    </form>
                </div>`
            )
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}


