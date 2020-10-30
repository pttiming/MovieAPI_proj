// Get all movies on load
$(document).ready(getAllMovies());

function getAllMovies() {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( JSON.stringify(data) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

(function($){
    function processForm( e ){
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
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form-create').submit( processForm );
})(jQuery);

// GET - Get all movies
(function($){
    function processForm( e ){
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( JSON.stringify(data) );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form-getAll').submit( processForm );
})(jQuery);

// GET - Get single movie
(function($){
    function processForm( e ){
        var id = 2;
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + id,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( JSON.stringify(data) );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form-getSingle').submit( processForm );
})(jQuery);

// DELETE
(function($){
    function processForm( e ){
        var id = 10;
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + id,
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( textStatus );
                console.log( textStatus );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form-delete').submit( processForm );
})(jQuery);

// PUT (update)
(function($){
    function processForm( e ){
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
                $('#response pre').html( "Movie Updated" );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form-update').submit( processForm );
})(jQuery);