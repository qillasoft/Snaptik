(function(){var defaults;var video;var thisTimeline;var start=0;var storyTime;var storySpinner;this.Story=function(){defaults={playlist:null};if(arguments[0]&&typeof arguments[0]==="object"){this.options=extendDefaults(defaults,arguments[0]);}
try{if(defaults.playlist==null||defaults.playlist==''){console.log('[SocialStories] No playlist provided.');return false;}}catch(e){console.log(e);return false;}
var Div=document.getElementById('storytime');var baseHTML='<div class="storytime" style="opacity: 0; display: none;">'+
'<div class="story-cover" onclick="socialStory.close();"></div>'+
'<div class="story-window">'+
'<a href="#" class="story-arrow left" onclick="socialStory.prev();"></a><a href="#" class="story-arrow right" onclick="socialStory.next();"></a>'+
'<div class="story-nav">'+
'<div class="story-nav-left"><img class="story-icon" src="" /> <span class="story-text"></span><span class="story-download"></span></div><div class="story-nav-right"><a href="#" class="close story-close" onclick="socialStory.close();"></a></div>'+
'</div>'+
'<div class="story-timeline"></div>'+
'<div class="story-video" onclick="socialStory.next();">'+
'<video class="story-next" src="" playsinline></video>'+
'</div>'+
'<div class="spinner">'+
'<div class="bounce1"></div>'+
'<div class="bounce2"></div>'+
'<div class="bounce3"></div>'+
'</div>'+
'</div>'+
'</div>';var timelineHTML='';Div.innerHTML=baseHTML;var i;for(i=0;i<defaults.playlist.length;i++){timelineHTML=timelineHTML+'<div class="story-timeline-item"><div class="story-timeline-line"></div><div class="story-timeline-line-active story-active-'+i+'" style="width: 0%;"></div></div>';}
var storyTimeline=document.getElementsByClassName('story-timeline')[0];storyTimeline.innerHTML=timelineHTML;};function extendDefaults(source,properties){var property;for(property in properties){if(properties.hasOwnProperty(property)){source[property]=properties[property];}}
return source;}
function launch(){storyTime=document.getElementsByClassName('storytime')[0];storySpinner=document.getElementsByClassName('spinner')[0];thisTimeline=document.getElementsByClassName('story-active-'+start)[0];var icon=document.getElementsByClassName('story-icon')[0];var text=document.getElementsByClassName('story-text')[0];var btnDownload=document.getElementsByClassName('story-download')[0];video=document.getElementsByTagName("video")[0];if(start==0){storyTime.setAttribute("style","display: block; opacity: 0;");}else{storyTime.setAttribute("style","display: block; opacity: 1;");}
storySpinner.style.display='block';setTimeout(function(){storyTime.setAttribute("style","display: block; opacity: 1;");},10);icon.src=defaults.playlist[start].icon;text.innerHTML=defaults.playlist[start].title;btnDownload.innerHTML='<a href="'+defaults.playlist[start].url+'" onclick="sendEvent(\'click_download_story\')" class="abutton is-success" rel="nofollow"><i class="icon icon-sprite icon-download"></i> download</a>';video.src=' ';video.src=defaults.playlist[start].url;video.load();thisTimeline.style.width='0%';video.oncanplay=function(){storySpinner.style.display='none';video.play();video.muted=false;};video.addEventListener('timeupdate',timeUpdate,false);video.addEventListener('ended',videoEnded,false);ga("send","event","home",'Play video stories');}
function timeUpdate(){var percentage=Math.ceil((100/video.duration)*video.currentTime);thisTimeline.style.width=percentage+'%';}
function videoEnded(){video.removeEventListener('timeupdate',timeUpdate);video.removeEventListener('ended',videoEnded);next();}
function next(){thisTimeline.style.width='100%';start++;if(start>=defaults.playlist.length){setTimeout(function(){close();return false;},400);}else{launch(start);}}
function prev(){if(start!=0){thisTimeline.style.width='0%';}
start--;if(start<0){start=0;return false;}else{launch(start);}}
function close(){video.pause();storyTime.setAttribute("style","opacity: 0;");setTimeout(function(){storyTime.setAttribute("style","opacity: 0; display: none;");var i;for(i=0;i<defaults.playlist.length;i++){document.getElementsByClassName('story-timeline-line-active')[i].setAttribute("style","width: 0%;");}},500);}
Story.prototype.launch=function(num){if(!num){var num=0;}
start=num;launch();};Story.prototype.next=function(){next();};Story.prototype.prev=function(){prev();};Story.prototype.close=function(){close();};}());function hideloaderRelated(countVideo){countVideo=countVideo-1;let divVideo=document.querySelectorAll('.related-videos-item');if(countVideo<5){for(var i=0;i<5;i++){if(countVideo<=i){divVideo[i].remove();}}}}
var myPlaylist;var socialStory;async function getRelatedVideos(url){const response=await fetch(url);var data=await response.json();if(response){hideloaderRelated(data.length);}
showRelatedVideos(data);}
function showRelatedVideos(data){if(data[0].aweme_id){let divVideo=document.querySelectorAll('.related-videos-item');for(let[index,value]of data.entries()){divVideo[index].innerHTML=`<div class="video-wrapper" style="background-size: cover;background-image: url('${value.thumb}')" onclick="socialStory.launch(${index});sendEvent('click_play_related_videos')"> <span class="related-videos-info"><svg class="like-icon" width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path></svg>`+Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(value.play_count)+`</span> </div>`;}
myPlaylist=data.map(function(video){return{title:video.name,date:'Related videos',url:video.dl,icon:video.thumb,}});socialStory=new Story({playlist:myPlaylist});}else{document.getElementById('auth-videos').innerHTML="No related videos found";}}