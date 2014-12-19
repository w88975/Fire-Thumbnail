var lwip = require('lwip');

var fs = require('fs'),
util = require('util'),
path = './mw-casual';
var paths = require('path');
var myDate = new Date();
var prcocessCount= 0;
var startTime =0;
var endTime=0;

function explorer(path){
	fs.readdir(path, function(err, files){
		if(err){
			console.log('error:\n' + err);
			return;
		}

		files.forEach(function(file){
			fs.stat(path + '/' + file, function(err, stat){
				if(err){console.log(err); return;}
				if(stat.isDirectory()){
					explorer(path + '/' + file);
				}else{
					var name = path + "/" + file;
					if (paths.extname(name).toUpperCase() == ".JPG" ||paths.extname(name).toUpperCase() == ".PNG" ) {
						test(name.toString(),file);
					}
				}
			});
		});
	});
}

function init() {
	myDate = new Date();
	startTime = myDate.getTime();
	explorer(path);

}

init();

var test = function resize(filename,name){
	prcocessCount++;
	var test = lwip.open(filename,function(err, image){
		image.resize( 20, 20, "lanczos",function(err, image){
			image.writeFile("./thumb/"+ name,"png", function(err){
				myDate = new Date();
				prcocessCount--;
				if(prcocessCount === 0) {
					myDate = new Date();
					endTime =myDate.getTime();
					console.log(endTime-startTime + "ms!");
				}
			})

		});
	});
}
