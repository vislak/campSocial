var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require ('./models/comment');

var data = [
	{
		name: 'Cloud\'s Rest',
	 	image: 'https://farm9.staticflickr.com/8480/8222787468_e8b069802e.jpg',
	 	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	 },
	 {
		name: 'Yosemite Camping',
	 	image: 'https://farm5.staticflickr.com/4309/35948486560_15620da737.jpg',
	 	description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	 },
	 {
		name: 'Tibetan Camps',
	 	image: 'https://farm4.staticflickr.com/3702/11425068924_796555d2d8.jpg',
	 	description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.y"
	 }
]

function seedDB() {
	// Removed all campgrounds
	Campground.remove({}, function(err) {
	if (err) {
		console.log(err);
	}
	
	console.log('removed campgrounds');	

	// Add a few campgrounds
	data.forEach(function(seed) {
		Campground.create(seed, function(err, campground) {
			if (err) {
				console.log(err);
			} else {

				console.log("added a campground");

				// Add comments

				Comment.create(
				{
					text: 'This place is great, but I wish it had internet',
					author: 'Homer'
				}, function (err, comment) {
					if (err) {
						console.log(err);
					} else {
						campground.comments.push(comment);
						campground.save();
						console.log('created new comment');
					}
					
				});

			}
		});
	});
	});
	
}


module.exports = seedDB;