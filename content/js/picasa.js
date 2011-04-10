/**
*
*  Add picasa gallery to your blog or website
*  http://www.webtoolkit.info/
*
**/
var picasa = {

	galleries: 0,

	gallery: function (galleryObjectId, galleryObjectName, settings) {
		this.galleryObjectId = galleryObjectId;
		this.galleryObjectName = galleryObjectName;
		this.containerId = settings.containerId;
		this.userName = settings.userName;
		this.albumName = settings.albumName;
		this.imageSize = settings.imageSize;
		this.itemsArray = [];

		this.setup = function (data) {
			this.itemsArray = data.feed.entry;
			this.totalItems = this.itemsArray.length;

 			for (var x = 0; x < this.totalItems; x++) {
				jQuery('#' + this.containerId).append('<div onClick="document.location.href=\''+this.itemsArray[x].media$group.media$content[0].url+'\'" class="galleryItem" style="cursor: pointer; width: ' + this.imageSize + 'px; height: ' + this.imageSize + 'px; background: url(' + this.itemsArray[x].media$group.media$thumbnail[0].url + ') no-repeat center center; "></div>');
			}
		};

	},

	load: function (settings) {
		var galleryObjectId = picasa.galleries++;
		var galleryObjectName = 'picasa.gallery' + galleryObjectId;
		var galleryObject = eval(galleryObjectName + ' = new picasa.gallery(galleryObjectId, galleryObjectName, settings)');

		scriptLoader.load([
			'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
			'http://picasaweb.google.com/data/feed/api/user/' + galleryObject.userName + '/album/' + galleryObject.albumName + '?alt=json-in-script&callback=' + galleryObjectName + '.setup&kind=photo&thumbsize=' + galleryObject.imageSize
		]);
	}

}