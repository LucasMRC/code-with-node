const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
const cloudinary = require('cloudinary');
const Post = require('../models/post');

cloudinary.config({
	cloud_name: 'perspectiva',
	api_key: '243345793276666',
	api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
	// `GET posts index =====================================
	async postIndex(req, res, next) {
		const posts = await Post.paginate(
			{},
			{
				page: req.query.page || 1,
				limit: 10,
				sort: '-_id'
			}
		);
		posts.page = Number(posts.page);
		res.render('posts/index', {
			posts,
			mapBoxToken,
			title: 'Posts Index'
		});
	},

	// GET new post =========================================
	postNew(req, res, next) {
		return res.render('posts/new', { title: 'New Post' });
	},

	// POST create post =====================================
	async postCreate(req, res, next) {
		req.body.post.images = [];
		for (const file of req.files) {
			const image = await cloudinary.v2.uploader.upload(file.path, {
				folder: 'Code-with-Node Course'
			});
			req.body.post.images.push({
				url: image.secure_url,
				public_id: image.public_id
			});
		}
		const response = await geocodingClient
			.forwardGeocode({
				query: req.body.post.location,
				limit: 1
			})
			.send();
		req.body.post.geometry = response.body.features[0].geometry;
		console.log(response);
		const post = new Post(req.body.post);
		post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${
			post.location
		}</p><p>${post.description.substring(0, 20)}...</p>`;
		await post.save();
		req.session.success = 'Post created successfully';
		res.redirect(`/posts/${post.id}`);
	},

	// GET show post ========================================
	async postShow(req, res, next) {
		const post = await Post.findById(req.params.id).populate({
			path: 'reviews',
			options: { sort: { _id: -1 } },
			populate: {
				path: 'author',
				model: 'User'
			}
		});
		const floorRating = post.calculateAvgRating();
		res.render('posts/show', { post, mapBoxToken, floorRating });
	},

	// GET edit post ========================================
	async postEdit(req, res, next) {
		const post = await Post.findById(req.params.id);
		res.render('posts/edit', { post });
	},

	// PUT update post ======================================
	async postUpdate(req, res, next) {
		// find the post by id
		const post = await Post.findById(req.params.id);
		//  check if there's any images for deletion
		if (req.body.deleteImages && req.body.deleteImages.length) {
			//  assign deleteImages from req.body to its own variable
			const { deleteImages } = req.body;
			//  loop over deleteImages
			for (const public_id of deleteImages) {
				//  delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				//  delete images from post.images
				for (const image of post.images) {
					if (image.public_id === public_id) {
						const index = post.images.indexOf(image);
						post.images.splice(index, 1);
					}
				}
			}
		}
		//  check if there are any new images for upload
		if (req.files) {
			//  upload images
			for (const file of req.files) {
				const image = await cloudinary.v2.uploader.upload(file.path, {
					folder: 'Code-with-Node Course'
				});
				//  add images to post.images array
				post.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}
		//  Check if location was updated
		if (req.body.post.location !== post.location) {
			const response = await geocodingClient
				.forwardGeocode({
					query: req.body.post.location,
					limit: 1
				})
				.send();
			post.geometry = response.body.features[0].geometry;
			post.location = req.body.post.location;
		}
		//  update the post with any new properties
		post.title = req.body.post.title;
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		// eslint-disable-next-line prettier/prettier
        post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong><p>${post.location}</p><p>${post.description.substring(0, 20)}...</p>`;
		//  save the updated post into the db
		post.save();
		//  redirect to show page
		req.session.success = 'Post updated successfully!';
		res.redirect(`/posts/${post.id}`);
	},

	// DELETE update post ===================================
	async postDestroy(req, res, next) {
		// find post by id
		const post = await Post.findById(req.params.id);
		// get images of the post
		for (const image of post.images) {
			// delete image from cloudinary
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		// delete post
		await post.remove();
		// redirect to show page
		req.session.success = 'Post deleted succesfully!';
		res.redirect('/posts');
	}
};
