/*
* Image preview script 
* powered by jQuery (http://www.jquery.com)
* 
* written by Alen Grakalic (http://cssglobe.com)
* 
* for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
*
*/

this.imagePreview = function() {

    /* BEGIN CONFIG */
    xOffset = 10;       // these 2 variable determine popup's distance from the cursor
    yOffset = 300;      // you might want to adjust to get the right result
    /* END CONFIG   */

    $("a.GalleryPhotoLink").hover(function(e) {
        this.t = this.title;
        this.title = "";
        var c = (this.t != "") ? "<br/>" + this.t : "";
        $("#GalleryPhotoArea").append("<div id='GalleryPhotoLink'><div id='GalleyPhotoLoading'></div><img src='" + this.href.substring(this.href.indexOf("#", 0) + 1, this.href.length) + "' alt='' />" + c + "</div>");
        $("#GalleryPhotoLink")
			.css("top", (e.pageY - f_scrollTop() - yOffset) + "px")
			.css("left", (e.pageX - f_scrollLeft() + xOffset) + "px")
			.fadeIn("slow");
    },
	function() {
	    this.title = this.t;
	    $("#GalleryPhotoLink").remove();
	});

    $("a.GalleryPhotoLink").mousemove(function(e) {
        $("#GalleryPhotoLink")
			.css("top", (e.pageY - f_scrollTop() - yOffset) + "px")
			.css("left", (e.pageX - f_scrollLeft() + xOffset) + "px");
    });

    $("a.GalleryPhotoLink").click(function(e) {
        window.location = "#";        //This was added so that the link wouldn't link directly to the jpg file.
    });
};


// starting the script on page load
$(document).ready(function() {
    imagePreview();
});

function f_scrollLeft() {
    return f_filterResults(
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop() {
    return f_filterResults(
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
