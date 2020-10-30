// Get all movies on load
$(document).ready(viewAllMovies());

// Button click events

$('#my-form-getAll').submit(getAllMovies);
$('#my-form-getSingle').submit(getSingleMovie);
$('#my-form-create').submit(addMovie);
$('#my-form-update').submit(updateMovie);
$('#my-form-delete').submit(deleteMovie);

// API Calls

// Load all movies into table (GET all copy)
function viewAllMovies() {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $.each(data, function(key, value){
                $("#allMoviesTable").append(
                    `<tr>
                        <td>${value.title}</td>
                        <td>
                            <button type="submit">Details</button>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>`
                )
            })
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

// GET - Get all movies
function getAllMovies( e ){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data)
            //$('#response pre').html( JSON.stringify(data) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

// GET - Get single movie
function getSingleMovie( e ){
    var id = 2;
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            console.log(data);
            //$('#response pre').html( JSON.stringify(data) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

//Post - Add movie
function addMovie( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value
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
function deleteMovie( e ){
    var id = 12;
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

    e.preventDefault();
}