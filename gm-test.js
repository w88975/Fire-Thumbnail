var fs = require('fs')
, gm = require('gm');
var paths = require('path');

var path= "./mw-casual";

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
						thumb(name.toString(),file);
					}
				}
			});
		});
	});
}

function init(){
	myDate = new Date();
	startTime = myDate.getTime();
	explorer(path);
}

init();

function thumb (filename,name) {
	prcocessCount++;
	gm(filename)
	.thumb(20, 20, "./thumb2/"+ name, 100, function(){
		prcocessCount--;
		if(prcocessCount === 0) {
			myDate = new Date();
			endTime =myDate.getTime();
			console.log(endTime-startTime + "ms!");
			//console.log("endtime:"+endTime+"/r startTime:"+startTime);
		}
	});
}
