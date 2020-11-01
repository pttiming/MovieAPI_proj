// Get all movies on load
//$(document).ready(viewAllMovies());

// Button click events

//$('#my-form-getAll').submit(getAllMovies);
//$('#my-form-getSingle').submit(getSingleMovie);
//$('#my-form-create1').submit(addMovie());
$('#my-form-create').submit(addMovie);
//$('#my-form-update').submit(updateMovie);
//$('#my-form-delete').submit(deleteMovie);

// API Calls

// Load all movies into table (GET all copy)

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
                            <button class="edit" onclick="showInConsole(${value.movieId})">Edit</button>
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
        Genre: document.forms.my["genre"].value
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
        MovieId : 5,
        Title : "Die Hard",
        Director: "Brandon Prange",
        Genre: "Action"
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
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
}

function newMovie(){
    $("#response").empty();
    $("#response").append(
        `<div><form name="my">
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="director" placeholder="Director" />
        <input type="text" name="genre" placeholder="Genre" />
        
        <button type="submit" onclick="addMovie()">Create</button>
    </form>
</div>`
    )
}
